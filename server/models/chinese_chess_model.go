package models

type ChineseChess struct {
	ID        int
	Side      string
	Name      string
	IsFliped  bool
	Location int
	Rank      int
	Alive     bool
}
