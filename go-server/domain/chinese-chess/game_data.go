package chinesechess

import "go-server/domain"

type GameData struct {
	ChineseChess []*ChineseChess `json:"chinese_chess"`
}

const (
	Standard domain.GameMode = "standard"
	Hidden   domain.GameMode = "hidden"
)
