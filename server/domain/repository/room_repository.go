package repository

import (
	"server/domain/model"
)

type RoomRepository interface {
	FindAll() ([]*model.Room, error)
	FindByID(id string) (*model.Room, error)
	Save(*model.Room) error
}
