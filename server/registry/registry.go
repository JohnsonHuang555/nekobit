package registry

import (
	"server/domain/model"
	"server/infrastructure/datastore"
	"server/interface/controller"
)

type registry struct {
	db      *datastore.DbCollection
	rooms   []*model.Room
	roomNum int
}

type Registry interface {
	NewAppController() controller.AppController
}

func NewRegistry(db *datastore.DbCollection, rooms []*model.Room, roomNum int) Registry {
	return &registry{db, rooms, roomNum}
}

func (r *registry) NewAppController() controller.AppController {
	// return r.NewGameController()
	return {
		r.NewRoomController()
	}
}
