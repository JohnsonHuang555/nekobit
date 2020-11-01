package repository

import (
	chinesechess "go-server/domain/chinese-chess"
)

type chineseChessRepository struct {
	chesses    []*chinesechess.ChineseChess
	playerSide map[string]chinesechess.ChineseChessSide
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

func (cr *chineseChessRepository) UpdatePlayerSide(pid string, side chinesechess.ChineseChessSide) map[string]chinesechess.ChineseChessSide {
	_, exist := cr.playerSide[pid]
	// 不存在才塞值
	if !exist {
		cr.playerSide[pid] = side
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
