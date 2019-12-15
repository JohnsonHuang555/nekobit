package socket

import (
	"fmt"
	"log"
	"net/http"
	"time"

	// "server/controllers"
	// "server/middleware"
	"server/models"

	"github.com/gorilla/websocket"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// connection is an middleman between the websocket connection and the hub.
type connection struct {
	ws   *websocket.Conn
	send chan MsgData
}

type MsgData struct {
	UserID string     `json:"userID"`
	Event  string     `json:"event"`
	Data   Attachment `json:"data"`
}

// 前端附加資訊
type Attachment struct {
	Name         string        `json:"name,omitempty"`
	IsMaster     bool          `json:"isMaster,omitempty"`
	IsReady      bool          `json:"isReady,omitempty"`
	ChessID      int           `json:"chessID,omitempty"`
	GameData     interface{}   `json:"gameData,omitempty"`
	RoomPassword string        `json:"roomPassword,omitempty"`
	RoomTitle    string        `json:"roomTitle,omitempty"`
	RoomMode     int           `json:"roomMode,omitempty"`
	RoomStatus   int           `json:"roomStatus,omitempty"`
	RoomUserList []models.User `json:"roomUserList,omitempty"`
}

var nowRooms = []models.Room{}
var roomID = 0

// ReadPump pumps messages from the websocket connection to the hub.
func (s subscription) readPump() {
	c := s.conn
	defer func() {
		h.unregister <- s
		c.ws.Close()
	}()
	c.ws.SetReadLimit(maxMessageSize)
	c.ws.SetReadDeadline(time.Now().Add(pongWait))
	c.ws.SetPongHandler(func(string) error { c.ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		var msg MsgData
		err := c.ws.ReadJSON(&msg)

		switch msg.Event {
		case "createRoom":
			user := models.User{
				ID:        msg.UserID,
				Name:      msg.Data.Name,
				IsMaster:  msg.Data.IsMaster,
				IsReady:   msg.Data.IsMaster,
				PlayOrder: 0,
			}

			room := &models.Room{
				ID:       roomID,
				Password: msg.Data.RoomPassword,
				Title:    msg.Data.RoomTitle,
				Mode:     msg.Data.RoomMode,
				Status:   msg.Data.RoomStatus,
				UserList: []models.User{user},
				GameData: nil,
			}

			fmt.Println(room)

		case "joinRoom":
			// user := models.User{
			// 	ID:        msg.UserID,
			// 	Name:      msg.Data.Name,
			// 	IsMaster:  msg.Data.IsMaster,
			// 	IsReady:   msg.Data.IsMaster,
			// 	PlayOrder: 0,
			// }

			// if models.AddUser(user)
			// payload, _ := controllers.JoinRoom(middleware.RoomCollection, user, s.room)
			// msg.Data.DbData = payload
		case "leaveRoom":
			// payload, _ := controllers.LeaveRoom(middleware.RoomCollection, msg.UserID, s.room)
			// msg.Data.DbData = payload
		// case "setGameReady":
		// 	payload, _ := controllers.SetGameReady(middleware.RoomCollection, s.room, msg.UserID, msg.Data.IsReady)
		// 	msg.Data.DbData = payload
		// case "setPlayOrder":
		// 	payload, _ := controllers.SetGameReady(middleware.RoomCollection, s.room)
		// case "setGameStart":
		// 	controllers.SetGameStart(middleware.RoomCollection, s.room)
		// 	gameData := controllers.CreateChesses()
		// 	info := models.RoomInfo{
		// 		RoomID: s.room,
		// 		GameData: gameData,
		// 	}

		// 	roomsInfo = append(roomsInfo, info)
		// 	msg.Data.GameData = gameData
		default:
			log.Printf("Socket error: no match event")
		}

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				log.Printf("error: %v", err)
			}
			break
		}
		m := message{msg, s.room}
		h.broadcast <- m
	}
}

// writePump pumps messages from the hub to the websocket connection.
func (s *subscription) writePump() {
	c := s.conn
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.ws.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				c.ws.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			c.ws.WriteJSON(message)
		case <-ticker.C:
			if err := c.ws.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

// serveWs handles websocket requests from the peer.
func ServeWs(w http.ResponseWriter, r *http.Request, roomID string) {
	go h.run()
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	c := &connection{send: make(chan MsgData), ws: ws}
	s := subscription{c, roomID}
	h.register <- s
	go s.writePump()
	s.readPump()
}
