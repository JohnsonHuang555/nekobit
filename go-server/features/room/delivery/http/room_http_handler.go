package http

import (
	"go-server/domain"
	"go-server/utils"
	"net/http"

	"github.com/labstack/echo"
)

type createRoomParams struct {
	Title    string          `json:"title"`
	Password string          `json:"password"`
	GameID   domain.GamePack `json:"game_id"`
	Mode     int             `json:"mode"`
}

type RoomHttpHandler struct {
	RoomUseCase domain.RoomUseCase
}

func NewRoomHttpHandler(e *echo.Echo, rus domain.RoomUseCase) {
	handler := &RoomHttpHandler{
		RoomUseCase: rus,
	}

	e.POST("/api/createRoom", handler.CreateRoom)
	e.GET("/api/getRooms", handler.GetRooms)
}

func (r *RoomHttpHandler) CreateRoom(c echo.Context) error {
	var params *createRoomParams
	err := c.Bind(&params)
	if err != nil {
		return err
	}

	id, err := r.RoomUseCase.CreateRoom(params.Title, params.Mode, params.Password, params.GameID)
	if err != nil {
		return c.JSON(utils.GetStatusCode(err), utils.ResponseError{Message: err.Error()})
	}

	return c.JSON(http.StatusCreated, id)
}

func (r *RoomHttpHandler) GetRooms(c echo.Context) error {
	rooms := r.RoomUseCase.GetRooms()
	return c.JSON(http.StatusOK, rooms)
}
