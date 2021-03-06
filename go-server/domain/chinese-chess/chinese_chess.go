package chinesechess

import "go-server/domain"

type ChineseChess struct {
	ID        int              `json:"id"`
	Side      ChineseChessSide `json:"side"`
	Name      ChineseChessName `json:"name"`
	IsFliped  bool             `json:"is_fliped"`
	LocationX int              `json:"location_x"`
	LocationY int              `json:"location_y"`
	Rank      int              `json:"rank"`
	Alive     bool             `json:"alive"`
}

// from socket params
type NetChineseChess struct {
	ChessID          int              `json:"chess_id"`
	TargetID         int              `json:"target_id"`
	LocationX        int              `json:"location_x"`
	LocationY        int              `json:"location_y"`
	ChineseChessSide ChineseChessSide `json:"chinese_chess_side"`
	PlayersID        []string         `json:"players_id"`
	CheckMate        bool             `json:"check_mate"`
}

type ChineseChessRepository interface {
	FindAll() []*ChineseChess
	FindOne(id int) *ChineseChess
	FindOneByLocation(x int, y int) *ChineseChess
	UpdateOne(id int, c *ChineseChess)
	UpdatePlayerSide(pid string, side ChineseChessSide, playersID []string) map[string]ChineseChessSide
}

type ChineseChessUseCase interface {
	FlipChess(id int, pid string, side ChineseChessSide, playersID []string) ([]*ChineseChess, map[string]ChineseChessSide)
	EatChess(id int, targetID int) []*ChineseChess
	MoveChess(id int, locationX int, locationY int) []*ChineseChess
	CreateGame(gameMode domain.GameMode) *GameData
	CheckGameOver(pid string, playerSides map[string]ChineseChessSide, gameMode domain.GameMode, nowChesses []*ChineseChess) bool
	CheckMate(id int) bool
}
