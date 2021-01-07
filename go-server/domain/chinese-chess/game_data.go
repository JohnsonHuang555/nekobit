package chinesechess

import "go-server/domain"

type GameData struct {
	ChineseChess []*ChineseChess             `json:"chinese_chess"`
	PlayerSide   map[string]ChineseChessSide `json:"player_side"`
}

const (
	Standard domain.GameMode = "standard"
	Hidden   domain.GameMode = "hidden"
)
