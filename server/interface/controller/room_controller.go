package controller

import (
	"net/http"

	"server/usecase/interactor"
)

type roomController struct {
	roomInteractor interactor.RoomInteractor
}

type RoomController interface {
	CreateRoom(c Context) error
	// GetRooms(m router.MsgData) router.MsgData
	// JoinRoom(m router.MsgData) router.MsgData
	// LeaveRoom(m router.MsgData) router.MsgData
	// ReadyGame(m router.MsgData) router.MsgData
	// StartGame(m router.MsgData) router.MsgData
}

type createRoomParams struct {
	Title    string `json:"title"`
	Password string `json:"password"`
	GameID   string `json:"gameID"`
	Mode     int    `json:"mode"`
}

func NewRoomController(room interactor.RoomInteractor) RoomController {
	return &roomController{room}
}

func (rc *roomController) CreateRoom(c Context) error {
	params := new(createRoomParams)
	if err := c.Bind(params); err != nil {
		return err
	}
	err := rc.roomInteractor.AddOne(params.Title, params.Mode, params.Password, params.GameID)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, nil)
}

// func (rc *roomController) GetRooms(m router.MsgData) router.MsgData {

// }

// func (rc *roomController) JoinRoom(c Context) router.MsgData {

// }

// func (rc *roomController) LeaveRoom(c Context) router.MsgData {

// }

// func (rc *roomController) ReadyGame(c Context) router.MsgData {

// }

// func (rc *roomController) StartGame(c Context) router.MsgData {

// }
