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
	send chan domain.MsgData
}

// WebsocketHandler handles websocket requests from the peer.
func WebsocketHandler(
	ru domain.RoomUseCase,
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
	conn := &connection{send: make(chan domain.MsgData), ws: ws}
	s := subscription{conn, roomID, ru}
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
		var msg domain.MsgData
		err := c.ws.ReadJSON(&msg)
		newMsg := SocketEventHandler(
			msg,
			s.room,
			s.roomUseCase,
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
