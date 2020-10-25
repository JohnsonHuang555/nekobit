package http

import (
	"go-server/domain"
	"go-server/utils"
	"net/http"

	"github.com/labstack/echo"
)

type createRoomParams struct {
	Title    string `json:"title"`
	Password string `json:"password"`
	GameID   string `json:"gameID"`
	Mode     int    `json:"mode"`
}

type RoomHandler struct {
	RoomUseCase domain.RoomUseCase
}

func NewRoomHandler(e *echo.Echo, rus domain.RoomUseCase) {
	handler := &RoomHandler{
		RoomUseCase: rus,
	}

	e.POST("/api/createRoom", handler.CreateRoom)
}

func (r *RoomHandler) CreateRoom(c echo.Context) error {
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
