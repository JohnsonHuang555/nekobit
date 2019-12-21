package controllers

import (
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

func (r *RoomService) UserList(id int) []models.User {
	index := r.FindByID(id)
	return r.rooms[index].UserList
}

// Create Room
func (r *RoomService) Create(room models.Room) int {
	r.roomNum++
	room.ID = r.roomNum
	r.rooms = append(r.rooms, room)
	return r.roomNum
}

// Delete Room 判斷是否為最後一人
func (r *RoomService) DeleteUser(id int) bool {
	index := r.FindByID(id)
	if index == -1 {
		return false
	}

	r.rooms = append(r.rooms[:index], r.rooms[index+1:]...)
	return true
}

// 回傳 roomInfo
func (r *RoomService) AddUser(roomID int, user models.User) models.Room {
	index := r.FindByID(roomID)
	// 當房間沒有其他玩家時，設定為房主
	if len(r.rooms[index].UserList) == 0 {
		user.IsMaster = true
		user.IsReady = true
	}

	userIndex := r.FindUserByID(user.ID, index)
	// 判斷是否已經在房間內
	if userIndex == -1 {
		r.rooms[index].UserList = append(r.rooms[index].UserList, user)
	}
	return r.rooms[index]
}

func (r *RoomService) FindUserByID(userID string, roomIndex int) int {
	users := r.rooms[roomIndex].UserList
	index := -1
	for i := 0; i < len(users); i++ {
		if users[i].ID == userID {
			index = i
		}
	}
	return index
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
