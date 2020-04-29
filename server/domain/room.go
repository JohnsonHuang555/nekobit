package domain

import "time"

// Room schema structure
type Room struct {
	ID         string      `json:"id"`
	RoomNumber int         `json:"room_number"` // 房號 可修改
	Password   string      `json:"password"`
	Title      string      `json:"title"`
	Mode       int         `json:"mode"`
	Status     int         `json:"status"`
	UserList   []*User     `json:"user_list"`
	NowTurn    string      `json:"now_turn"`
	GameData   interface{} `json:"game_data"`
	GameID     string      `json:"game_id"`
	CreatedAt  time.Time   `json:"created_at"`
}

// RoomUseCase represent the room's usecases
type RoomUseCase interface {
	GetRooms() ([]*Room, error)
	JoinRoom(id string, userID string, userName string) ([]*User, error)
	LeaveRoom(id string, userID string) ([]*User, error)
	ReadyGame(id string, userID string) ([]*User, error)
	StartGame(id string) error
	CreateRoom(title string, mode int, password string, gameID string) (string, error)
}

// RoomRepository represent the room's repository contract
type RoomRepository interface {
	FindAll(r []*Room) ([]*Room, error)
	FindByID(id string) (*Room, error)
	DeleteByID(id string) error
	UpdateByID(id string, room *Room) (*Room, error)
	Create(*Room) (string, error)
}
