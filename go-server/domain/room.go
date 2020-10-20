package domain

import "time"

type Status string

const (
	Preparing Status = "preparing" // 準備中
	Playing   Status = "playing"   // 遊戲中
)

type Room struct {
	ID        string      `json:"id"` // uuid
	Title     string      `json:"title"`
	Password  string      `json:"password"`
	Mode      int         `json:"mode"`
	Status    Status      `json:"status"`
	Players   []*Player   `json:"user_list"`
	NowTurn   string      `json:"now_turn"`
	GameData  interface{} `json:"game_data"`
	GameID    string      `json:"game_id"`
	CreatedAt time.Time   `json:"created_at"`
}

type RoomRepository interface {
	FindAll() []*Room
	FindByID(id string) (*Room, error)
	Create(r *Room) (string, error) // return id
	DeleteByID(id string) error
	UpdateByID(id string, r *Room) error

	// player
	FindPlayerAll(rid string) []*Player
	FindPlayerByID(rid string, uid string) (*Player, error)
	CreatePlayer(rid string, p *Player) error
	DeletePlayerByID(rid string, uid string) error
	UpdatePlayerByID(rid string, uid string, p *Player) error
}
