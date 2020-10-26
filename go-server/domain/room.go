package domain

import "time"

type Status string

const (
	Preparing Status = "preparing" // 準備中
	Playing   Status = "playing"   // 遊戲中
)

// 所有遊戲種類
type GamePack string

const (
	ChineseChess GamePack = "chinese_chess" // 象棋
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
	GamePack  GamePack    `json:"game_pack"`
	CreatedAt time.Time   `json:"created_at"`
}

type RoomRepository interface {
	FindAll() []*Room
	FindByID(id string) (*Room, error)
	Create(r *Room) (string, error) // return id
	DeleteByID(id string) error
	UpdateByID(id string, r *Room) error

	// player
	FindAllPlayers(rid string) []*Player
	FindPlayerByID(rid string, pid string) (*Player, error)
	CreatePlayer(rid string, p *Player) error
	DeletePlayerByID(rid string, pid string) error
	UpdatePlayerByID(rid string, pid string, p *Player) error
}

type RoomUseCase interface {
	GetRooms() []*Room
	GetRoomInfo(rid string) (*Room, error)
	JoinRoom(rid string, pid string, playerName string) (*Room, error)
	LeaveRoom(rid string, pid string) ([]*Player, error)
	ReadyGame(rid string, pid string) ([]*Player, error)
	StartGame(rid string, gameData interface{}) (*Room, error)
	CreateRoom(title string, mode int, password string, gamePack GamePack) (string, error)
}
