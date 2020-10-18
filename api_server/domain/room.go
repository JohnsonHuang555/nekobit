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
	UserList   []*Player   `json:"user_list"`
	NowTurn    string      `json:"now_turn"`
	GameData   interface{} `json:"game_data"`
	GameID     string      `json:"game_id"`
	CreatedAt  time.Time   `json:"created_at"`
}

// RoomUseCase represent the room's usecases
type RoomUseCase interface {
	GetRooms() ([]*Room, error)
	JoinRoom(id string, userID string, userName string) (*Room, error)
	LeaveRoom(id string, userID string) ([]*Player, error)
	ReadyGame(id string, userID string) ([]*Player, error)
	StartGame(id string, gameData interface{}) (*Room, error)
	CreateRoom(title string, mode int, password string, gameID string) (string, error)

	GetRoomInfo(roomID string) (*Room, error)
	UpdateGameData(roomID string, gameData interface{}) (interface{}, error)
	SetPlayOrder(id string) (*Room, error)
	ChangePlayerTurn(id string, userID string) (string, error)
	// SetPlayerSideIndependence(id string, userID string, side string, allSides []string) ([]*Player, error)
	GameOver(id string) (*Room, error)
	ChangeRoomPassword(id string, password string) (*Room, error)
	ChooseCharacter(roomID string, userID string, characterID int) ([]*Player, error)
	ChooseGroup(roomID string, userID string, group int) ([]*Player, error)
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
	UpdateUsersPlayOrder(roomID string) ([]*Player, error)

	// user
	FindUserByID(roomID string, userID string) (*Player, error)
	FindUserByPlayOrder(roomID string, playOrder int) (*Player, error)
	AddUser(roomID string, u *Player) ([]*Player, error)
	RemoveUser(roomID string, userID string) ([]*Player, error)

	UpdateUserIsReady(roomID string, userID string) ([]*Player, error)
	UpdateUserIsMaster(roomID string, userID string, isMaster bool) ([]*Player, error)
	UpdateUserCharacterID(roomID string, userID string, characterID int) ([]*Player, error)
	UpdateUserGroup(roomID string, userID string, group int) ([]*Player, error)
}
