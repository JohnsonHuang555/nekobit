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
	GamePack domain.GamePack `json:"game_pack"`
	GameMode domain.GameMode `json:"game_mode"`
}

type RoomHttpHandler struct {
	RoomUseCase domain.RoomUseCase
}

func NewRoomHttpHandler(e *echo.Echo, rus domain.RoomUseCase) {
	handler := &RoomHttpHandler{
		RoomUseCase: rus,
	}

	e.POST("/api/createRoom", handler.CreateRoom)
	e.GET("/api/getRooms/:id", handler.GetRooms)
}

func (r *RoomHttpHandler) CreateRoom(c echo.Context) error {
	var params *createRoomParams
	err := c.Bind(&params)
	if err != nil {
		return err
	}

	id, err := r.RoomUseCase.CreateRoom(params.Title, params.GameMode, params.Password, params.GamePack)
	if err != nil {
		return c.JSON(utils.GetStatusCode(err), utils.ResponseError{Message: err.Error()})
	}

	return c.JSON(http.StatusCreated, id)
}

func (r *RoomHttpHandler) GetRooms(c echo.Context) error {
	gamePack := c.Param("game_pack")
	rooms := r.RoomUseCase.GetRooms(gamePack)
	return c.JSON(http.StatusOK, rooms)
}
