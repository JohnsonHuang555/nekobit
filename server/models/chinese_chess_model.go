package models

// ChineseChess struct
type ChineseChess struct {
	ID        int    `json:"id"`
	Side      string `json:"side"`
	Name      string `json:"name"`
	IsFliped  bool   `json:"isFliped"`
	Location  int    `json:"location"`
	LocationX int    `json:"locationX"`
	LocationY int    `json:"locationY"`
	Rank      int    `json:"rank"`
	Alive     bool   `json:"alive"`
}
