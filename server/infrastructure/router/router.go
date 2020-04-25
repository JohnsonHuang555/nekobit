package router

import (
	"log"
	"net/http"
	"server/interface/controller"
	"time"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
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
	UserID string      `json:"userID"`
	Event  string      `json:"event"`
	Data   interface{} `json:"data"`
}

func NewRouter(e *echo.Echo, c controller.AppController) *echo.Echo {
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/api/getAllGames", func(context echo.Context) error { return c.GetGames(context) })
	e.GET("/api/getGameInfo", func(context echo.Context) error { return c.GetGameInfo(context) })
	e.GET("/ws/:roomID", func(contex echo.Context) error { return socketHandler(contex, c) })

	return e
}

func socketHandler(context echo.Context, controller controller.AppController) error {
	roomID := context.Param("roomID")
	go h.run()
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(context.Response(), context.Request(), nil)
	if err != nil {
		log.Println(err)
		return err
	}
	conn := &connection{send: make(chan MsgData), ws: ws}
	s := subscription{conn, roomID}
	h.register <- s
	go s.writePump()
	s.readPump(controller)

	return nil
}

// ReadPump pumps messages from the websocket connection to the hub.
func (s subscription) readPump(controller controller.AppController) {
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
		newMsg := eventHandler(msg, controller)
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

func eventHandler(msg MsgData, c controller.AppController) MsgData {
	switch msg.Event {
	case "getRooms":
	case "createRoom":
	case "joinRoom":
	case "leaveRoom":
	case "readyGame":
	case "startGame":
	}
	return msg
}
