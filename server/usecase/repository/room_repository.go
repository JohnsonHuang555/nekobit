package repository

import "server/domain/model"

type RoomRepository interface {
	FindAll(r []*model.Room) ([]*model.Room, error)
	FindByID(id string) (*model.Room, error)
	DeleteByID(id string) error
	UpdateByID(id string, room *model.Room) (*model.Room, error)
	Create(title string, mode int, password string, gameID string) error
}
