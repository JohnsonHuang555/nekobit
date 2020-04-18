package registry

import (
	"server/interface/controller"

	"go.mongodb.org/mongo-driver/mongo"
)

type registry struct {
	db *mongo.Collection
}

type Registry interface {
	NewAppController() controller.AppController
}

func NewRegistry(db *mongo.Collection) Registry {
	return &registry{db}
}

func (r *registry) NewAppController() controller.AppController {
	return r.NewGameController()
}
