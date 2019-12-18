package controllers

import (
	"fmt"
	"server/models"
)

// RoomService struct
type RoomService struct {
	rooms   []models.Room
	roomNum int
}

// NewRoomService function
func NewRoomService() *RoomService {
	roomService := &RoomService{}
	roomService.roomNum = 1
	room := models.NewRoom(1, "", "Play", 0, 0, make([]models.User, 5), nil, "")
	roomService.rooms = append(roomService.rooms, room)
	return roomService
}

// Room List query
func (r *RoomService) List() []models.Room {
	return r.rooms
}

// Create Room
func (r *RoomService) Create(room models.Room) int {
	r.roomNum++
	room.ID = r.roomNum
	r.rooms = append(r.rooms, room)
	return r.roomNum
}

// Delete Room
func (r *RoomService) Delete(id int) bool {
	index := r.FindByID(id)
	if index == -1 {
		return false
	}

	r.rooms = append(r.rooms[:index], r.rooms[index+1:]...)
	return true
}

func (r *RoomService) AddUser(id int, user models.User) models.Room {

	fmt.Println(r.roomNum)
	// index := r.FindByID(id)
	// r.rooms[index].UserList = append(r.rooms[index].UserList, user)
	return r.rooms[0]
}

func (r *RoomService) GetUserList(id int) []models.User {
	index := r.FindByID(id)
	return r.rooms[index].UserList
}

// FindByID , if not found return -1
func (r *RoomService) FindByID(id int) int {
	// for each
	index := -1
	for i := 0; i < len(r.rooms); i++ {
		if r.rooms[i].ID == id {
			// found
			index = i
		}
	}
	return index
}
