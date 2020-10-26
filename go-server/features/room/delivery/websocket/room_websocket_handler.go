package websocket

import (
	"go-server/domain"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
)

type RoomWebSocketHandler struct {
	RoomUseCase domain.RoomUseCase
}

type MsgData struct {
	PlayerID string             `json:"player_id"`
	Event    domain.SocketEvent `json:"event"`
	Data     Attachment         `json:"data"`
}

type Attachment struct {
	PlayerName string           `json:"player_name,omitempty"`
	RoomInfo   *domain.Room     `json:"room_info,omitempty"`
	Players    []*domain.Player `json:"players,omitempty"`
	GamePack   domain.GamePack  `json:"game_pack,omitempty"`
	// IsMaster     bool           `json:"isMaster,omitempty"`
	// IsReady      bool           `json:"isReady,omitempty"`
	// GameData     interface{}    `json:"gameData,omitempty"`
	// RoomPassword string         `json:"roomPassword,omitempty"`
	// RoomTitle    string         `json:"roomTitle,omitempty"`
	// RoomMode     int            `json:"roomMode,omitempty"`
	// RoomStatus   int            `json:"roomStatus,omitempty"`
	// RoomUserList []*domain.Player `json:"roomUserList,omitempty"`
	// Rooms        []*domain.Room `json:"rooms,omitempty"`
	// RoomInfo     *domain.Room   `json:"roomInfo,omitempty"`
	// NowTurn      string         `json:"nowTurn,omitempty"`
	// CharacterID  int            `json:"characterID,omitempty"`
	// Group        int            `json:"group,omitempty"`
}

// connection is an middleman between the websocket connection and the hub.
type connection struct {
	ws   *websocket.Conn
	send chan MsgData
}

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

func NewRoomWebSocketHandler(e *echo.Echo, ru domain.RoomUseCase) {
	handler := &RoomWebSocketHandler{
		RoomUseCase: ru,
	}
	e.GET("/ws/:roomID", handler.SocketHandler)
}

func (r *RoomWebSocketHandler) SocketHandler(c echo.Context) error {
	roomID := c.Param("roomID")

	go h.run()
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		logrus.Println(err)
		return err
	}
	conn := &connection{send: make(chan MsgData), ws: ws}
	s := subscription{conn, roomID, r.RoomUseCase}
	h.register <- s
	go s.writePump()
	s.readPump()
	return nil
}

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
		// room, err := s.roomUseCase.GetRoomInfo(s.roomID)
		if err != nil && websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
			break
		}
		// 判斷是否開始遊戲
		// if !utils.IsNil(room) && room.GameData != nil {
		// 	switch room.GamePack {
		// 	case domain.ChineseChess:
		// 		// initial game
		// 	}
		// }

		switch msg.Event {
		case domain.JoinRoom:
			room, err := s.roomUseCase.JoinRoom(s.roomID, msg.PlayerID, msg.Data.PlayerName)
			if err == nil {
				msg.Data.RoomInfo = room
			}
		case domain.LeaveRoom:
			players, err := s.roomUseCase.LeaveRoom(s.roomID, msg.PlayerID)
			if err == nil {
				msg.Data.Players = players
			}
		case domain.ReadyGame:
			players, err := s.roomUseCase.ReadyGame(s.roomID, msg.PlayerID)
			if err == nil {
				msg.Data.Players = players
			}
		case domain.StartGame:
			// TODO:流程
			// 產遊戲資料
			// 寫入房間
			// 廣播出去
			switch msg.Data.GamePack {
			case domain.ChineseChess:
			}
			// s.roomUseCase.StartGame(s.roomID, )
		}
		m := message{msg, s.roomID}
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
