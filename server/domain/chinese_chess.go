package domain

type ChineseChess struct {
	ID        int    `json:"id"`
	Side      string `json:"side"`
	Name      string `json:"name"`
	IsFlipped bool   `json:"is_flipped"`
	Location  int    `json:"location"`
	LocationX int    `json:"location_x"`
	LocationY int    `json:"location_y"`
	Rank      int    `json:"rank"`
	Alive     bool   `json:"alive"`
}

type NetChineseChess struct {
	NewLocation  int `json:"newLocation,omitempty"`
	LocationX    int `json:"locationX,omitempty"`
	LocationY    int `json:"locationY,omitempty"`
	EatenChessID int `json:"eatenChessID,omitempty"`
	ChessID      int `json:"chessID,omitempty"`
}
