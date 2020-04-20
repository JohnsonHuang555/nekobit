package repository

import "server/domain/model"

type RoomRepository interface {
	FindAll(r []*model.Room) ([]*model.Room, error)
	FindOne(id int) (*model.Room, error)
	DeleteByID(id int) error
	UpdateByID(id int) (*model.Room, error)
	CreateOne(title string, mode int, password string) error
}
