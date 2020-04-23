package presenter

import "server/domain/model"

type RoomPresenter interface {
	ResponseRooms(r []*model.Room) []*model.Room
	ResponseOneRoom(r *model.Room) *model.Room
}
