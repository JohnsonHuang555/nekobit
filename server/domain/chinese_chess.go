package domain

type ChineseChess struct {
	NewLocation  int `json:"newLocation,omitempty"`
	LocationX    int `json:"locationX,omitempty"`
	LocationY    int `json:"locationY,omitempty"`
	EatenChessID int `json:"eatenChessID,omitempty"`
	ChessID      int `json:"chessID,omitempty"`
}
