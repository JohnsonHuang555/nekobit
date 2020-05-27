package delivery

import (
	"net/http"
	"server/domain"
	socket "server/middleware/websocket"

	_chineseChessRepo "server/features/chinese_chess/repository"
	_chineseChessUseCase "server/features/chinese_chess/usecase"

	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
)

// ResponseError represent the response error struct
type ResponseError struct {
	Message string `json:"message"`
}

// RoomHandler represent the httphandler for room
type RoomHandler struct {
	RUseCase domain.RoomUseCase
}

type createRoomParams struct {
	Title    string `json:"title"`
	Password string `json:"password"`
	GameID   string `json:"gameID"`
	Mode     int    `json:"mode"`
}

var chineseChessUseCase domain.ChineseChessUseCae

// NewRoomHandler will initialize the rooms/ resources endpoint
func NewRoomHandler(e *echo.Echo, ru domain.RoomUseCase) {
	handler := &RoomHandler{
		RUseCase: ru,
	}
	e.POST("/api/createRoom", handler.CreateRoom)
	e.GET("/ws/:roomID", handler.SocketHandler)
}

func (r *RoomHandler) CreateRoom(c echo.Context) error {
	var params *createRoomParams
	err := c.Bind(&params)
	if err != nil {
		return err
	}

	id, err := r.RUseCase.CreateRoom(params.Title, params.Mode, params.Password, params.GameID)
	if err != nil {
		return c.JSON(getStatusCode(err), ResponseError{Message: err.Error()})
	}

	return c.JSON(http.StatusCreated, id)
}

func (r *RoomHandler) SocketHandler(context echo.Context) error {
	roomID := context.Param("roomID")
	roomInfo, _ := r.RUseCase.GetRoomInfo(roomID)

	// 判斷是否在房間內，而非大廳
	if roomInfo != nil {
		// 判斷是否開始遊戲
		if roomInfo.GameData != nil {
			// Games
			chineseChessRepo := _chineseChessRepo.NewChineseChessRepository(roomInfo.GameData.([]*domain.ChineseChess))
			chineseChessUseCase = _chineseChessUseCase.NewChineseChessUseCase(chineseChessRepo)
		}
	}

	socket.WebsocketHandler(
		r.RUseCase,
		chineseChessUseCase,
		context,
		roomID,
	)
	return nil
}

func getStatusCode(err error) int {
	if err == nil {
		return http.StatusOK
	}

	logrus.Error(err)
	switch err {
	case domain.ErrInternalServerError:
		return http.StatusInternalServerError
	case domain.ErrNotFound:
		return http.StatusNotFound
	case domain.ErrConflict:
		return http.StatusConflict
	default:
		return http.StatusInternalServerError
	}
}
