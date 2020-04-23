package repository

import (
	"errors"
	"server/domain/model"
	"time"

	uuid "github.com/satori/go.uuid"
)

type roomRepository struct {
	rooms   []*model.Room
	roomNum int
}

type RoomRepository interface {
	FindAll(r []*model.Room) ([]*model.Room, error)
	FindByID(id string) (*model.Room, error)
	DeleteByID(id string) error
	UpdateByID(id string, room *model.Room) (*model.Room, error)
	Create(title string, mode int, password string, gameID string) error
}

func NewRoomRepository(rooms []*model.Room, roomNum int) RoomRepository {
	return &roomRepository{rooms, roomNum}
}

func (rr *roomRepository) FindAll(r []*model.Room) ([]*model.Room, error) {
	return rr.rooms, nil
}

func (rr *roomRepository) FindByID(id string) (*model.Room, error) {
	index := rr.findByID(id)
	if index == -1 {
		return nil, errors.New("Room not found")
	}
	return rr.rooms[index], nil
}

func (rr *roomRepository) DeleteByID(id string) error {
	index := rr.findByID(id)
	if index == -1 {
		return errors.New("Room not found")
	}
	rr.rooms = append(rr.rooms[:index], rr.rooms[index+1:]...)
	return nil
}

func (rr *roomRepository) UpdateByID(id string, room *model.Room) (*model.Room, error) {
	var r *model.Room
	index := rr.findByID(id)
	if index == -1 {
		return r, errors.New("Room not found")
	}
	rr.rooms[index] = room
	return rr.rooms[index], nil
}

func (rr *roomRepository) Create(title string, mode int, password string, gameID string) error {
	rr.roomNum++
	uuid := uuid.NewV4().String()
	room := model.NewRoom(uuid, rr.roomNum, password, title, mode, 0, []*model.User{}, "", nil, gameID, time.Now())
	rr.rooms = append(rr.rooms, room)
	return nil
}

// findByID if not found return -1
func (rr *roomRepository) findByID(id string) int {
	// for each
	index := -1
	for i := 0; i < len(rr.rooms); i++ {
		if rr.rooms[i].ID == id {
			// found
			index = i
		}
	}
	return index
}
