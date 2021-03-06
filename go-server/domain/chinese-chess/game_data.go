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

func GetChesses() []*ChineseChess {
	chesses := []*ChineseChess{
		{
			ID:        1,
			Side:      "BLACK",
			Name:      "將",
			LocationX: 4,
			LocationY: 0,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        2,
			Side:      "BLACK",
			Name:      "士",
			LocationX: 3,
			LocationY: 0,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        3,
			Side:      "BLACK",
			Name:      "士",
			LocationX: 5,
			LocationY: 0,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        4,
			Side:      "BLACK",
			Name:      "象",
			LocationX: 2,
			LocationY: 0,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        5,
			Side:      "BLACK",
			Name:      "象",
			LocationX: 6,
			LocationY: 0,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        6,
			Side:      "BLACK",
			Name:      "車",
			LocationX: 0,
			LocationY: 0,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        7,
			Side:      "BLACK",
			Name:      "車",
			LocationX: 8,
			LocationY: 0,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        8,
			Side:      "BLACK",
			Name:      "馬",
			LocationX: 1,
			LocationY: 0,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        9,
			Side:      "BLACK",
			Name:      "馬",
			LocationX: 7,
			LocationY: 0,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        10,
			Side:      "BLACK",
			Name:      "卒",
			LocationX: 0,
			LocationY: 3,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        11,
			Side:      "BLACK",
			Name:      "卒",
			LocationX: 2,
			LocationY: 3,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        12,
			Side:      "BLACK",
			Name:      "卒",
			LocationX: 4,
			LocationY: 3,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        13,
			Side:      "BLACK",
			Name:      "卒",
			LocationX: 6,
			LocationY: 3,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        14,
			Side:      "BLACK",
			Name:      "卒",
			LocationX: 8,
			LocationY: 3,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        15,
			Side:      "BLACK",
			Name:      "包",
			LocationX: 1,
			LocationY: 2,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        16,
			Side:      "BLACK",
			Name:      "包",
			LocationX: 7,
			LocationY: 2,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        17,
			Side:      "RED",
			Name:      "帥",
			LocationX: 4,
			LocationY: 9,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        18,
			Side:      "RED",
			Name:      "仕",
			LocationX: 3,
			LocationY: 9,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        19,
			Side:      "RED",
			Name:      "仕",
			LocationX: 5,
			LocationY: 9,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        20,
			Side:      "RED",
			Name:      "相",
			LocationX: 2,
			LocationY: 9,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        21,
			Side:      "RED",
			Name:      "相",
			LocationX: 6,
			LocationY: 9,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        22,
			Side:      "RED",
			Name:      "俥",
			LocationX: 0,
			LocationY: 9,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        23,
			Side:      "RED",
			Name:      "俥",
			LocationX: 8,
			LocationY: 9,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        24,
			Side:      "RED",
			Name:      "傌",
			LocationX: 1,
			LocationY: 9,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        25,
			Side:      "RED",
			Name:      "傌",
			LocationX: 7,
			LocationY: 9,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        26,
			Side:      "RED",
			Name:      "兵",
			LocationX: 0,
			LocationY: 6,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        27,
			Side:      "RED",
			Name:      "兵",
			LocationX: 2,
			LocationY: 6,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        28,
			Side:      "RED",
			Name:      "兵",
			LocationX: 4,
			LocationY: 6,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        29,
			Side:      "RED",
			Name:      "兵",
			LocationX: 6,
			LocationY: 6,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        30,
			Side:      "RED",
			Name:      "兵",
			LocationX: 8,
			LocationY: 6,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        31,
			Side:      "RED",
			Name:      "炮",
			LocationX: 1,
			LocationY: 7,
			IsFliped:  true,
			Alive:     true,
		},
		{
			ID:        32,
			Side:      "RED",
			Name:      "炮",
			LocationX: 7,
			LocationY: 7,
			IsFliped:  true,
			Alive:     true,
		},
	}
	return chesses
}
