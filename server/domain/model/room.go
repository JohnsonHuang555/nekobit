package model

import "time"

// Room schema structure
type Room struct {
	ID        int         `json:"id"`
	Password  string      `json:"password"`
	Title     string      `json:"title"`
	Mode      int         `json:"mode"`
	Status    int         `json:"status"`
	UserList  []User      `json:"user_list"`
	NowTurn   string      `json:"now_turn"`
	GameData  interface{} `json:"game_data"`
	GameID    string      `json:"game_id"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
	DeletedAt time.Time   `json:"deleted_at"`
}
