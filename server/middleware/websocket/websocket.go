package middleware

import (
	"log"
	"net/http"
	"server/domain"
	"time"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo"
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

type Attachment struct {
	UserName     string         `json:"userName,omitempty"`
	IsMaster     bool           `json:"isMaster,omitempty"`
	IsReady      bool           `json:"isReady,omitempty"`
	GameData     interface{}    `json:"gameData,omitempty"`
	RoomPassword string         `json:"roomPassword,omitempty"`
	RoomTitle    string         `json:"roomTitle,omitempty"`
	RoomMode     int            `json:"roomMode,omitempty"`
	RoomStatus   int            `json:"roomStatus,omitempty"`
	RoomUserList []*domain.User `json:"roomUserList,omitempty"`
	Rooms        []*domain.Room `json:"rooms,omitempty"`
	RoomInfo     *domain.Room   `json:"roomInfo,omitempty"`

	domain.NetChineseChess
}

// WebsocketHandler handles websocket requests from the peer.
func WebsocketHandler(
	ru domain.RoomUseCase,
	ccu domain.ChineseChessUseCae,
	c echo.Context,
	roomID string,
) {
	go h.run()
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		log.Println(err)
		return
	}
	conn := &connection{send: make(chan MsgData), ws: ws}
	s := subscription{conn, roomID, ru, ccu}
	h.register <- s
	go s.writePump()
	s.readPump()
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
		newMsg := SocketEventHandler(
			msg,
			s.room,
			s.roomUseCase,
			s.chineseChessUseCase,
		)
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
