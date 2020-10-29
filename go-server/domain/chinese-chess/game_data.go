package chinesechess

type GameData struct {
	ChineseChess []*ChineseChess `json:"chinese_chess"`
}

type GameMode string

const (
	Standard GameMode = "standard"
	Hidden   GameMode = "hidden"
)
