package controllers

import (
	"server/models"
	"server/utils"
)

// CreateChesses 建立象棋
func CreateChesses() []models.ChineseChess {
	gameData := []models.ChineseChess{}

	var chesses = map[int]models.ChineseChess{
		0: models.ChineseChess{
			ID:   1,
			Side: "BLACK",
			Name: "將",
			Rank: 6,
		},
		1: models.ChineseChess{
			ID:   2,
			Side: "BLACK",
			Name: "士",
			Rank: 5,
		},
		2: models.ChineseChess{
			ID:   3,
			Side: "BLACK",
			Name: "士",
			Rank: 5,
		},
		3: models.ChineseChess{
			ID:   4,
			Side: "BLACK",
			Name: "象",
			Rank: 4,
		},
		4: models.ChineseChess{
			ID:   5,
			Side: "BLACK",
			Name: "象",
			Rank: 4,
		},
		5: models.ChineseChess{
			ID:   6,
			Side: "BLACK",
			Name: "車",
			Rank: 3,
		},
		6: models.ChineseChess{
			ID:   7,
			Side: "BLACK",
			Name: "車",
			Rank: 3,
		},
		7: models.ChineseChess{
			ID:   8,
			Side: "BLACK",
			Name: "馬",
			Rank: 2,
		},
		8: models.ChineseChess{
			ID:   9,
			Side: "BLACK",
			Name: "馬",
			Rank: 2,
		},
		9: models.ChineseChess{
			ID:   10,
			Side: "BLACK",
			Name: "卒",
			Rank: 1,
		},
		10: models.ChineseChess{
			ID:   11,
			Side: "BLACK",
			Name: "卒",
			Rank: 1,
		},
		11: models.ChineseChess{
			ID:   12,
			Side: "BLACK",
			Name: "卒",
			Rank: 1,
		},
		12: models.ChineseChess{
			ID:   13,
			Side: "BLACK",
			Name: "卒",
			Rank: 1,
		},
		13: models.ChineseChess{
			ID:   14,
			Side: "BLACK",
			Name: "卒",
			Rank: 1,
		},
		14: models.ChineseChess{
			ID:   15,
			Side: "BLACK",
			Name: "炮",
			Rank: 0,
		},
		15: models.ChineseChess{
			ID:   16,
			Side: "BLACK",
			Name: "炮",
			Rank: 0,
		},
		16: models.ChineseChess{
			ID:   17,
			Side: "RED",
			Name: "帥",
			Rank: 6,
		},
		17: models.ChineseChess{
			ID:   18,
			Side: "RED",
			Name: "仕",
			Rank: 5,
		},
		18: models.ChineseChess{
			ID:   19,
			Side: "RED",
			Name: "仕",
			Rank: 5,
		},
		19: models.ChineseChess{
			ID:   20,
			Side: "RED",
			Name: "像",
			Rank: 4,
		},
		20: models.ChineseChess{
			ID:   21,
			Side: "RED",
			Name: "像",
			Rank: 4,
		},
		21: models.ChineseChess{
			ID:   22,
			Side: "RED",
			Name: "俥",
			Rank: 3,
		},
		22: models.ChineseChess{
			ID:   23,
			Side: "RED",
			Name: "俥",
			Rank: 3,
		},
		23: models.ChineseChess{
			ID:   24,
			Side: "RED",
			Name: "傌",
			Rank: 2,
		},
		24: models.ChineseChess{
			ID:   25,
			Side: "RED",
			Name: "傌",
			Rank: 2,
		},
		25: models.ChineseChess{
			ID:   26,
			Side: "RED",
			Name: "兵",
			Rank: 1,
		},
		26: models.ChineseChess{
			ID:   27,
			Side: "RED",
			Name: "兵",
			Rank: 1,
		},
		27: models.ChineseChess{
			ID:   28,
			Side: "RED",
			Name: "兵",
			Rank: 1,
		},
		28: models.ChineseChess{
			ID:   29,
			Side: "RED",
			Name: "兵",
			Rank: 1,
		},
		29: models.ChineseChess{
			ID:   30,
			Side: "RED",
			Name: "兵",
			Rank: 1,
		},
		30: models.ChineseChess{
			ID:   31,
			Side: "RED",
			Name: "炮",
			Rank: 0,
		},
		31: models.ChineseChess{
			ID:   32,
			Side: "RED",
			Name: "炮",
			Rank: 0,
		},
	}

	randLocation := utils.RandomShuffle(32)

	for i := 0; i < 32; i++ {
		ID := chesses[i].ID
		Side := chesses[i].Side
		Name := chesses[i].Name
		Rank := chesses[i].Rank
		gameData = append(gameData, models.ChineseChess{
			ID:       ID,
			Side:     Side,
			Name:     Name,
			IsFliped: false,
			Location: randLocation[i],
			Rank:     Rank,
			Alive:    true,
		})
	}
	return gameData
}
