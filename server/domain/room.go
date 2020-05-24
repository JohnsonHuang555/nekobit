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
	JoinRoom(id string, userID string, userName string) (*Room, error)
	LeaveRoom(id string, userID string) ([]*User, error)
	ReadyGame(id string, userID string) ([]*User, error)
	StartGame(id string) (*Room, error)
	CreateRoom(title string, mode int, password string, gameID string) (string, error)

	UpdateGameData(roomID string, gameData interface{}) (interface{}, error)
}

// RoomRepository represent the room's repository contract
type RoomRepository interface {
	FindAll(r []*Room) ([]*Room, error)
	FindByID(id string) (*Room, error)
	DeleteByID(id string) error
	Create(r *Room) (string, error)

	UpdateStatusByID(id string, status int) (*Room, error)
	UpdatePasswordByID(id string, password string) (*Room, error)
	UpdateModeByID(id string, mode int) (*Room, error)
	UpdateNowTurnByID(id string, nowTurn string) (*Room, error)
	UpdateGameIDByID(id string, gameID string) (*Room, error)
	UpdateGameData(roomID string, gameData interface{}) (interface{}, error)

	AddUser(roomID string, u *User) ([]*User, error)
	RemoveUser(roomID string, userID string) ([]*User, error)

	UpdateUserIsReady(roomID string, userID string) ([]*User, error)
	UpdateUserIsMaster(roomID string, userID string, isMaster bool) ([]*User, error)
	UpdateUserPlayOrder(roomID string, userID string, playOrder int) ([]*User, error)
	UpdateUserSide(roomID string, userID string, side string) ([]*User, error)
}
