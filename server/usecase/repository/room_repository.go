package repository

import "server/domain/model"

type RoomRepository interface {
	FindAll(r []*model.Room) ([]*model.Room, error)
	DeleteByID(id int) error
	CreateOne(title string, mode int, password string) error
}
