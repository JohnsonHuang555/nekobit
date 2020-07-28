package domain

import (
	"math"
	"server/utils"
)

// domain 層的
type ChineseChess struct {
	ID        int    `json:"id"`
	Side      string `json:"side"`
	Name      string `json:"name"`
	IsFlipped bool   `json:"isFlipped"`
	LocationX int    `json:"locationX"`
	LocationY int    `json:"locationY"`
	Rank      int    `json:"rank"`
	Alive     bool   `json:"alive"`
}

// 從外部進來的
type NetChineseChess struct {
	NewLocation  int `json:"newLocation,omitempty"`
	LocationX    int `json:"locationX,omitempty"`
	LocationY    int `json:"locationY,omitempty"`
	EatenChessID int `json:"eatenChessID,omitempty"`
	ChessID      int `json:"chessID,omitempty"`
	TargetID     int `json:"targetID,omitempty"`
}

type ChineseChessUseCae interface {
	GetNewChess() ([]*ChineseChess, error)
	EatChess(id int, targetID int) ([]*ChineseChess, error)
	MoveChess(id int, locationX int, locationY int) ([]*ChineseChess, error)
	FlipChess(id int) ([]*ChineseChess, string, error)
}

type ChineseChessRepository interface {
	Create() ([]*ChineseChess, error)
	FindAll() []*ChineseChess
	GetChessLocation(chessID int) (int, int)
	UpdateLocation(chessID int, locationX int, locationY int) error
	UpdateIsFlipped(chessID int) (string, error)
	UpdateAlive(chessID int, isAlive bool) error
}

var TwoSides = []string{
	"RED",
	"BLACK",
}

// CreateChesses 建立象棋小盤
func CreateChessesHidden() []*ChineseChess {
	var gameData []*ChineseChess

	var chesses = map[int]*ChineseChess{
		0: {
			ID:   1,
			Side: "BLACK",
			Name: "將",
			Rank: 6,
		},
		1: {
			ID:   2,
			Side: "BLACK",
			Name: "士",
			Rank: 5,
		},
		2: {
			ID:   3,
			Side: "BLACK",
			Name: "士",
			Rank: 5,
		},
		3: {
			ID:   4,
			Side: "BLACK",
			Name: "象",
			Rank: 4,
		},
		4: {
			ID:   5,
			Side: "BLACK",
			Name: "象",
			Rank: 4,
		},
		5: {
			ID:   6,
			Side: "BLACK",
			Name: "車",
			Rank: 3,
		},
		6: {
			ID:   7,
			Side: "BLACK",
			Name: "車",
			Rank: 3,
		},
		7: {
			ID:   8,
			Side: "BLACK",
			Name: "馬",
			Rank: 2,
		},
		8: {
			ID:   9,
			Side: "BLACK",
			Name: "馬",
			Rank: 2,
		},
		9: {
			ID:   10,
			Side: "BLACK",
			Name: "卒",
			Rank: 1,
		},
		10: {
			ID:   11,
			Side: "BLACK",
			Name: "卒",
			Rank: 1,
		},
		11: {
			ID:   12,
			Side: "BLACK",
			Name: "卒",
			Rank: 1,
		},
		12: {
			ID:   13,
			Side: "BLACK",
			Name: "卒",
			Rank: 1,
		},
		13: {
			ID:   14,
			Side: "BLACK",
			Name: "卒",
			Rank: 1,
		},
		14: {
			ID:   15,
			Side: "BLACK",
			Name: "包",
			Rank: 0,
		},
		15: {
			ID:   16,
			Side: "BLACK",
			Name: "包",
			Rank: 0,
		},
		16: {
			ID:   17,
			Side: "RED",
			Name: "帥",
			Rank: 6,
		},
		17: {
			ID:   18,
			Side: "RED",
			Name: "仕",
			Rank: 5,
		},
		18: {
			ID:   19,
			Side: "RED",
			Name: "仕",
			Rank: 5,
		},
		19: {
			ID:   20,
			Side: "RED",
			Name: "相",
			Rank: 4,
		},
		20: {
			ID:   21,
			Side: "RED",
			Name: "相",
			Rank: 4,
		},
		21: {
			ID:   22,
			Side: "RED",
			Name: "俥",
			Rank: 3,
		},
		22: {
			ID:   23,
			Side: "RED",
			Name: "俥",
			Rank: 3,
		},
		23: {
			ID:   24,
			Side: "RED",
			Name: "傌",
			Rank: 2,
		},
		24: {
			ID:   25,
			Side: "RED",
			Name: "傌",
			Rank: 2,
		},
		25: {
			ID:   26,
			Side: "RED",
			Name: "兵",
			Rank: 1,
		},
		26: {
			ID:   27,
			Side: "RED",
			Name: "兵",
			Rank: 1,
		},
		27: {
			ID:   28,
			Side: "RED",
			Name: "兵",
			Rank: 1,
		},
		28: {
			ID:   29,
			Side: "RED",
			Name: "兵",
			Rank: 1,
		},
		29: {
			ID:   30,
			Side: "RED",
			Name: "兵",
			Rank: 1,
		},
		30: {
			ID:   31,
			Side: "RED",
			Name: "炮",
			Rank: 0,
		},
		31: {
			ID:   32,
			Side: "RED",
			Name: "炮",
			Rank: 0,
		},
	}

	randLocation := utils.RandomShuffle(32)

	for i := 0; i < 32; i++ {
		x := randLocation[i] % 8
		y := math.Floor(float64(randLocation[i] / 8))
		gameData = append(gameData, &ChineseChess{
			ID:        chesses[i].ID,
			Side:      chesses[i].Side,
			Name:      chesses[i].Name,
			IsFlipped: false,
			Rank:      chesses[i].Rank,
			Alive:     true,
			LocationX: x,
			LocationY: int(y),
		})
	}
	return gameData
}

// CreateChesses 建立象棋大盤
func CreateChessesStandard() []*ChineseChess {
	var chesses = []*ChineseChess{
		{
			ID:        1,
			Side:      "BLACK",
			Name:      "將",
			LocationX: 4,
			LocationY: 0,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        2,
			Side:      "BLACK",
			Name:      "士",
			LocationX: 3,
			LocationY: 0,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        3,
			Side:      "BLACK",
			Name:      "士",
			LocationX: 5,
			LocationY: 0,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        4,
			Side:      "BLACK",
			Name:      "象",
			LocationX: 2,
			LocationY: 0,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        5,
			Side:      "BLACK",
			Name:      "象",
			LocationX: 6,
			LocationY: 0,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        6,
			Side:      "BLACK",
			Name:      "車",
			LocationX: 0,
			LocationY: 0,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        7,
			Side:      "BLACK",
			Name:      "車",
			LocationX: 8,
			LocationY: 0,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        8,
			Side:      "BLACK",
			Name:      "馬",
			LocationX: 1,
			LocationY: 0,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        9,
			Side:      "BLACK",
			Name:      "馬",
			LocationX: 7,
			LocationY: 0,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        10,
			Side:      "BLACK",
			Name:      "卒",
			LocationX: 0,
			LocationY: 3,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        11,
			Side:      "BLACK",
			Name:      "卒",
			LocationX: 2,
			LocationY: 3,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        12,
			Side:      "BLACK",
			Name:      "卒",
			LocationX: 4,
			LocationY: 3,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        13,
			Side:      "BLACK",
			Name:      "卒",
			LocationX: 6,
			LocationY: 3,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        14,
			Side:      "BLACK",
			Name:      "卒",
			LocationX: 8,
			LocationY: 3,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        15,
			Side:      "BLACK",
			Name:      "包",
			LocationX: 1,
			LocationY: 2,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        16,
			Side:      "BLACK",
			Name:      "包",
			LocationX: 7,
			LocationY: 2,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        17,
			Side:      "RED",
			Name:      "帥",
			LocationX: 4,
			LocationY: 9,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        18,
			Side:      "RED",
			Name:      "仕",
			LocationX: 3,
			LocationY: 9,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        19,
			Side:      "RED",
			Name:      "仕",
			LocationX: 5,
			LocationY: 9,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        20,
			Side:      "RED",
			Name:      "相",
			LocationX: 2,
			LocationY: 9,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        21,
			Side:      "RED",
			Name:      "相",
			LocationX: 6,
			LocationY: 9,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        22,
			Side:      "RED",
			Name:      "俥",
			LocationX: 0,
			LocationY: 9,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        23,
			Side:      "RED",
			Name:      "俥",
			LocationX: 8,
			LocationY: 9,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        24,
			Side:      "RED",
			Name:      "傌",
			LocationX: 1,
			LocationY: 9,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        25,
			Side:      "RED",
			Name:      "傌",
			LocationX: 7,
			LocationY: 9,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        26,
			Side:      "RED",
			Name:      "兵",
			LocationX: 0,
			LocationY: 6,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        27,
			Side:      "RED",
			Name:      "兵",
			LocationX: 2,
			LocationY: 6,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        28,
			Side:      "RED",
			Name:      "兵",
			LocationX: 4,
			LocationY: 6,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        29,
			Side:      "RED",
			Name:      "兵",
			LocationX: 6,
			LocationY: 6,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        30,
			Side:      "RED",
			Name:      "兵",
			LocationX: 8,
			LocationY: 6,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        31,
			Side:      "RED",
			Name:      "炮",
			LocationX: 1,
			LocationY: 7,
			IsFlipped: true,
			Alive:     true,
		},
		{
			ID:        32,
			Side:      "RED",
			Name:      "炮",
			LocationX: 7,
			LocationY: 7,
			IsFlipped: true,
			Alive:     true,
		},
	}
	return chesses
}
