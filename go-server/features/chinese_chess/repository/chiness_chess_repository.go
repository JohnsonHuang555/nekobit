package repository

import (
	chinesechess "go-server/domain/chinese-chess"
)

type chineseChessRepository struct {
	chesses []*chinesechess.ChineseChess
}

func NewChineseChessRepository(chesses []*chinesechess.ChineseChess) chinesechess.ChineseChessRepository {
	return &chineseChessRepository{chesses}
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

func (c *chineseChessRepository) findIndexByID(id int) int {
	index := -1
	for i := 0; i < len(c.chesses); i++ {
		if c.chesses[i].ID == id {
			// found
			index = i
		}
	}
	return index
}
