package domain

import "time"

type Status string

const (
	Preparing Status = "preparing" // 準備中
	Playing   Status = "playing"   // 遊戲中
)

// 所有遊戲種類
type GamePack string
type GameMode string

const (
	ChineseChess GamePack = "chinese_chess" // 象棋
)

type Room struct {
	ID        string      `json:"id"` // uuid
	Title     string      `json:"title"`
	Password  string      `json:"password"`
	Status    Status      `json:"status"`
	Players   []*Player   `json:"player_list"`
	NowTurn   string      `json:"now_turn"`
	GameData  interface{} `json:"game_data"`
	GamePack  GamePack    `json:"game_pack"`
	GameMode  GameMode    `json:"game_mode"`
	CreatedAt time.Time   `json:"created_at"`
}

type RoomRepository interface {
	FindAllByGID(gamePack string) []*Room
	FindByID(id string) (*Room, error)
	Create(r *Room) (string, error) // return id
	DeleteByID(id string) error
	UpdateByID(id string, r *Room) error

	// player
	FindAllPlayers(rid string) []*Player
	FindPlayerByID(rid string, pid string) (*Player, error)
	FindPlayerByPlayerOrder(rid string, po int) (*Player, error)
	CreatePlayer(rid string, p *Player) error
	DeletePlayerByID(rid string, pid string) error
	UpdatePlayerByID(rid string, pid string, p *Player) error
}

type RoomUseCase interface {
	GetRooms(gamePack string) []*Room
	GetRoomInfo(rid string) (*Room, error)
	JoinRoom(rid string, pid string, playerName string) (*Room, error)
	LeaveRoom(rid string, pid string) ([]*Player, error)
	ReadyGame(rid string, pid string) ([]*Player, error)
	StartGame(rid string, gameData interface{}) (*Room, error)
	CreateRoom(title string, gameMode GameMode, password string, gamePack GamePack) (string, error)
	UpdateGameData(rid string, gameData interface{}) error
	ChangePlayerTurn(rid string, pid string) (string, error)
	GameOver(rid string) error
}
