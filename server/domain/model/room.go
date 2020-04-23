package model

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

// NewRoom instance
func NewRoom(
	id string,
	roomNumber int,
	password string,
	title string,
	mode int,
	status int,
	userList []*User,
	nowTurn string,
	gameData interface{},
	gameID string,
	createdAt time.Time,
) *Room {
	return &Room{
		ID:         id,
		RoomNumber: roomNumber,
		Password:   password,
		Title:      title,
		Mode:       mode,
		Status:     status,
		UserList:   userList,
		NowTurn:    nowTurn,
		GameData:   gameData,
		GameID:     gameID,
		CreatedAt:  createdAt,
	}
}
