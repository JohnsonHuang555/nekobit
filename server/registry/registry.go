package registry

import (
	"server/infrastructure/datastore"
	"server/interface/controller"
)

type registry struct {
	db *datastore.DbCollection
}

type Registry interface {
	NewAppController() controller.AppController
}

func NewRegistry(db *datastore.DbCollection) Registry {
	return &registry{db}
}

func (r *registry) NewAppController() controller.AppController {
	return r.NewGameController()
}
