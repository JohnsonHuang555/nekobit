package delivery

import (
	"errors"
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
func NewRoomHandler(e *echo.Echo, us domain.RoomUseCase) {
	handler := &RoomHandler{
		RUseCase: us,
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

func (r *RoomHandler) SocketHandler(c echo.Context) error {
	roomID := c.Param("roomID")
	if roomID != "" {
		socket.WebsocketHandler(r.RUseCase, c, roomID)
		return nil
	}
	return errors.New("Websocket connect error")
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
