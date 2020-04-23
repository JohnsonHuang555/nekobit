package presenter

import "server/domain/model"

type roomPresenter struct{}

type RoomPresenter interface {
	ResponseRooms(r []*model.Room) []*model.Room
	ResponseOneRoom(r *model.Room) *model.Room
}

func NewRoomPresenter() RoomPresenter {
	return &roomPresenter{}
}

func (rp *roomPresenter) ResponseRooms(rooms []*model.Room) []*model.Room {
	return rooms
}

func (rp *roomPresenter) ResponseOneRoom(room *model.Room) *model.Room {
	return room
}
