package socket

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"server/middleware"
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
	GameName     string        `json:"gameName,omitempty"`
	RoomPassword string        `json:"roomPassword,omitempty"`
	RoomTitle    string        `json:"roomTitle,omitempty"`
	RoomMode     int           `json:"roomMode,omitempty"`
	RoomStatus   int           `json:"roomStatus,omitempty"`
	RoomUserList []models.User `json:"roomUserList,omitempty"`
	Rooms        []models.Room `json:"rooms,omitempty"`
	RoomID       int           `json:"roomID,omitempty"`
	RoomInfo     models.Room   `json:"roomInfo,omitempty"`
}

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
		newMsg := eventHandler(msg, s)
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				log.Printf("error: %v", err)
			}
			break
		}
		m := message{newMsg, s.room}
		h.broadcast <- m
	}
}

func eventHandler(msg MsgData, s subscription) MsgData {
	switch msg.Event {
	case "getRooms":
		msg.Data.Rooms = middleware.Rv.GetRoomList()
	case "createRoom":
		room := models.NewRoomWithoutID(msg.Data.RoomPassword, msg.Data.RoomTitle,
			msg.Data.RoomMode, 0, []models.User{}, nil, "", msg.Data.GameName)

		roomID := middleware.Rv.RoomService.Create(room)
		if roomID != 0 {
			fmt.Println("create room success", roomID)
		} else {
			fmt.Println("create room failed")
		}
		msg.Data.RoomID = roomID
	case "joinRoom":
		user := models.User{
			ID:        msg.UserID,
			Name:      msg.Data.Name,
			IsMaster:  false,
			IsReady:   false,
			PlayOrder: 0,
		}
		roomInfo := middleware.Rv.RoomService.AddUser(msg.Data.RoomID, user)
		msg.Data.RoomInfo = roomInfo
	case "leaveRoom":
		fmt.Println("leave room")
	case "readyGame":
		middleware.Rv.RoomService.ReadyGame(msg.Data.RoomID, msg.UserID)
		msg.Data.RoomUserList = middleware.Rv.GetUserList(msg.Data.RoomID)
	case "startGame":
		users, index := middleware.Rv.RoomService.StartGame(msg.Data.RoomID)
		middleware.Rv.RoomService.SetPlayOrder(users, index)
		msg.Data.RoomInfo = middleware.Rv.GetRoomInfo(msg.Data.RoomID)
	case "onFlip":
		middleware.Rv.RoomService.OnFlip(msg.Data.RoomID, msg.UserID, msg.Data.ChessID)
		msg.Data.RoomInfo = middleware.Rv.GetRoomInfo(msg.Data.RoomID)
	}

	return msg
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

// ServeWs handles websocket requests from the peer.
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
