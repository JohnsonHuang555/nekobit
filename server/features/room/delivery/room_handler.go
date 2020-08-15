package delivery

import (
	"net/http"
	"server/domain"

	socket "server/middleware/websocket"

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

// NewRoomHandler will initialize the rooms/ resources endpoint
func NewRoomHandler(e *echo.Echo, ru domain.RoomUseCase) {
	handler := &RoomHandler{
		RUseCase: ru,
	}
	e.POST("/api/createRoom", handler.CreateRoom)
	e.GET("/api/getRooms", handler.GetRooms)
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

func (r *RoomHandler) GetRooms(c echo.Context) error {
	rooms, err := r.RUseCase.GetRooms()
	if err != nil {
		return err
	}
	return c.JSON(http.StatusCreated, rooms)
}

func (r *RoomHandler) SocketHandler(context echo.Context) error {
	roomID := context.Param("roomID")
	socket.WebsocketHandler(
		r.RUseCase,
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
