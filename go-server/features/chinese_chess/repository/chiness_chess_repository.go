package repository

import (
	chinesechess "go-server/domain/chinese-chess"
)

type chineseChessRepository struct {
	chesses    []*chinesechess.ChineseChess
	playerSide []*chinesechess.PlayerSide
}

func NewChineseChessRepository(gameData *chinesechess.GameData) chinesechess.ChineseChessRepository {
	return &chineseChessRepository{chesses: gameData.ChineseChess, playerSide: gameData.PlayerSide}
}

func (cr *chineseChessRepository) FindAll() []*chinesechess.ChineseChess {
	return cr.chesses
}

func (cr *chineseChessRepository) FindOne(id int) *chinesechess.ChineseChess {
	chessIndex := cr.findIndexByID(id)

	return cr.chesses[chessIndex]
}

func (cr *chineseChessRepository) UpdateOne(id int, c *chinesechess.ChineseChess) {
	chessIndex := cr.findIndexByID(id)
	cr.chesses[chessIndex] = c
}

func (cr *chineseChessRepository) UpdatePlayerSide(pid string, side chinesechess.ChineseChessSide) []*chinesechess.PlayerSide {
	index := -1
	for i := 0; i < len(cr.playerSide); i++ {
		if cr.playerSide[i].ID == pid {
			// found
			index = i
		}
	}

	// 有了才塞值
	if index == -1 {
		cr.playerSide = append(cr.playerSide, &chinesechess.PlayerSide{
			ID:   pid,
			Side: side,
		})
	}

	return cr.playerSide
}

func (cr *chineseChessRepository) findIndexByID(id int) int {
	index := -1
	for i := 0; i < len(cr.chesses); i++ {
		if cr.chesses[i].ID == id {
			// found
			index = i
		}
	}
	return index
}
