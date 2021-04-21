package http

import (
	"go-server/domain"
	"go-server/utils"
	"net/http"

	"github.com/labstack/echo"
)

type RoomHttpHandler struct {
	RoomUseCase domain.RoomUseCase
	GameUseCase domain.GameUseCase
}

func NewRoomHttpHandler(e *echo.Echo, rus domain.RoomUseCase, gus domain.GameUseCase) {
	handler := &RoomHttpHandler{
		RoomUseCase: rus,
		GameUseCase: gus,
	}

	e.POST("/api/createRoom", handler.CreateRoom)
	e.GET("/api/getRooms/:game_pack", handler.GetRooms)
	e.GET("/api/checkJoinRoom/:room_id", handler.CheckJoinRoom)
}

type createRoomParams struct {
	Title    string          `json:"title"`
	Password string          `json:"password"`
	GamePack domain.GamePack `json:"game_pack"`
	GameMode domain.GameMode `json:"game_mode"`
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

type CheckJoinRoomResponse struct {
	CanJoin bool   `json:"can_join"`
	Message string `json:"message"`
}

func (r *RoomHttpHandler) CheckJoinRoom(c echo.Context) error {
	roomID := c.Param("room_id")
	room, err := r.RoomUseCase.GetRoomInfo(roomID)
	if err != nil {
		return c.JSON(http.StatusOK, &CheckJoinRoomResponse{
			CanJoin: false,
			Message: "房間不存在",
		})
	}

	game, err := r.GameUseCase.GetGameInfo(string(room.GamePack))
	if err != nil {
		return c.JSON(http.StatusOK, &CheckJoinRoomResponse{
			CanJoin: false,
			Message: err.Error(),
		})
	}

	canJoin, message, err := r.RoomUseCase.CheckJoinRoom(roomID, game.MaxPlayers)
	if err != nil {
		return c.JSON(http.StatusOK, &CheckJoinRoomResponse{
			CanJoin: false,
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, &CheckJoinRoomResponse{
		CanJoin: canJoin,
		Message: message,
	})
}
