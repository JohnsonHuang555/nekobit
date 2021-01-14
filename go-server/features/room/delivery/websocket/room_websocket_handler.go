package websocket

import (
	"fmt"
	"go-server/domain"
	chinesechess "go-server/domain/chinese-chess"
	"net/http"
	"time"

	chineseChessGameData "go-server/domain/chinese-chess"
	_chineseChessRepo "go-server/features/chinese_chess/repository"
	_chineseChessUseCase "go-server/features/chinese_chess/usecase"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
)

type RoomWebSocketHandler struct {
	RoomUseCase         domain.RoomUseCase
	ChineseChessUseCase chinesechess.ChineseChessUseCase
}

type MsgData struct {
	PlayerID string             `json:"player_id"`
	Event    domain.SocketEvent `json:"event"`
	Data     Attachment         `json:"data"`
}

type Attachment struct {
	PlayerName      string           `json:"player_name,omitempty"`
	RoomInfo        *domain.Room     `json:"room_info,omitempty"`
	Players         []*domain.Player `json:"players,omitempty"`
	GamePack        domain.GamePack  `json:"game_pack,omitempty"`
	GameData        interface{}      `json:"game_data,omitempty"`
	NowTurn         string           `json:"now_turn,omitempty"`
	GameOver        bool             `json:"game_over,omitempty"`
	domain.GameMode `json:"game_mode,omitempty"`
	chinesechess.NetChineseChess
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
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				break
			}
			c.ws.Close()
			return
		}

		room, err := s.roomUseCase.GetRoomInfo(s.roomID)
		if err != nil {
			break
		}

		// chinese chess
		ccGameData := &chineseChessGameData.GameData{
			ChineseChess: []*chineseChessGameData.ChineseChess{},
		}

		// inject games every connection
		if room.Status == domain.Playing {
			ccGameData = room.GameData.(*chineseChessGameData.GameData)
		}

		chineseChessRepo := _chineseChessRepo.NewChineseChessRepository(ccGameData)
		chineseChessUseCase := _chineseChessUseCase.NewChineseChessUseCase(chineseChessRepo)

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
			// 產遊戲資料
			var gameData interface{}
			switch msg.Data.GamePack {
			case domain.ChineseChess:
				gameData = chineseChessUseCase.CreateGame(msg.Data.GameMode)
			}
			// 寫入房間
			room, err := s.roomUseCase.StartGame(s.roomID, gameData)
			if err == nil {
				msg.Data.RoomInfo = room
			}
		case domain.Surrender:
			s.roomUseCase.GameOver(s.roomID)
			msg.Data.GameOver = true
		case domain.ChineseChessFlipChess:
			newChesses, playerSide := chineseChessUseCase.FlipChess(msg.Data.ChessID, msg.PlayerID, msg.Data.ChineseChessSide, msg.Data.PlayersID)
			ccGameData.ChineseChess = newChesses
			ccGameData.PlayerSide = playerSide
			nowTurn, err := s.roomUseCase.ChangePlayerTurn(s.roomID, msg.PlayerID)
			if err == nil {
				msg.Data.NowTurn = nowTurn
			}
			err = s.roomUseCase.UpdateGameData(s.roomID, ccGameData)
			if err == nil {
				msg.Data.GameData = ccGameData
			}
		case domain.ChineseChessMoveChess:
			newChesses := chineseChessUseCase.MoveChess(msg.Data.ChessID, msg.Data.LocationX, msg.Data.LocationY)
			ccGameData.ChineseChess = newChesses
			nowTurn, err := s.roomUseCase.ChangePlayerTurn(s.roomID, msg.PlayerID)
			if err == nil {
				msg.Data.NowTurn = nowTurn
			}
			err = s.roomUseCase.UpdateGameData(s.roomID, ccGameData)
			if err == nil {
				msg.Data.GameData = ccGameData
			}

			fmt.Println(room.GameMode)
			// 標準要多判斷是否將軍
			if room.GameMode == chinesechess.Standard {
				checkMate := chineseChessUseCase.CheckMate(msg.Data.ChessID)
				msg.Data.CheckMate = checkMate
			}
		case domain.ChineseChessEatChess:
			newChesses := chineseChessUseCase.EatChess(msg.Data.ChessID, msg.Data.TargetID)
			gameOver := chineseChessUseCase.CheckGameOver(msg.PlayerID, ccGameData.PlayerSide, room.GameMode)

			// 更改狀態
			if gameOver {
				s.roomUseCase.GameOver(s.roomID)
			}

			ccGameData.ChineseChess = newChesses
			nowTurn, err := s.roomUseCase.ChangePlayerTurn(s.roomID, msg.PlayerID)
			if err == nil {
				msg.Data.NowTurn = nowTurn
			}
			err = s.roomUseCase.UpdateGameData(s.roomID, ccGameData)
			if err == nil {
				msg.Data.GameData = ccGameData
				msg.Data.GameOver = gameOver
			}

			// 標準要多判斷是否將軍
			if room.GameMode == chinesechess.Standard {
				checkMate := chineseChessUseCase.CheckMate(msg.Data.ChessID)
				msg.Data.CheckMate = checkMate
			}
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
