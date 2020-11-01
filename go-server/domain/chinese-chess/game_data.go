package chinesechess

import "go-server/domain"

type GameData struct {
	ChineseChess []*ChineseChess             `json:"chinese_chess"`
	PlayerSide   map[string]ChineseChessSide `json:"player_side"`
}

// type PlayerSide struct {
// 	ID   string           `json:"id"`
// 	Side ChineseChessSide `json:"side"`
// }

const (
	Standard domain.GameMode = "standard"
	Hidden   domain.GameMode = "hidden"
)
