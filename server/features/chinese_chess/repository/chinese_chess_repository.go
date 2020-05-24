package repository

import (
	"errors"
	"server/domain"
)

type chineseChessRepository struct {
	chesses []*domain.ChineseChess
}

func NewChineseChessRepository() domain.ChineseChessRepository {
	return &chineseChessRepository{}
}

func (c *chineseChessRepository) Create() ([]*domain.ChineseChess, error) {
	chesses := domain.CreateChessesHidden()
	if chesses == nil {
		return nil, errors.New("Create error")
	}
	c.chesses = chesses
	return c.chesses, nil
}

func (c *chineseChessRepository) FindAll() []*domain.ChineseChess {
	return c.chesses
}

func (c *chineseChessRepository) UpdateLocation(chessID int, locationX int, locationY int) error {
	chessIndex := c.findIndexByID(chessID)
	if chessIndex == -1 {
		return errors.New("Chess not exist")
	}

	c.chesses[chessIndex].LocationX = locationX
	c.chesses[chessIndex].LocationY = locationY
	return nil
}

func (c *chineseChessRepository) UpdateIsFlipped(chessID int) error {
	chessIndex := c.findIndexByID(chessID)
	if chessIndex == -1 {
		return errors.New("Chess not exist")
	}
	c.chesses[chessIndex].IsFlipped = !c.chesses[chessIndex].IsFlipped
	return nil
}

func (c *chineseChessRepository) UpdateAlive(chessID int, isAlive bool) error {
	chessIndex := c.findIndexByID(chessID)
	if chessIndex == -1 {
		return errors.New("Chess not exist")
	}
	c.chesses[chessIndex].Alive = isAlive
	return nil
}

func (c *chineseChessRepository) GetChessLocation(chessID int) (int, int) {
	chessIndex := c.findIndexByID(chessID)
	if chessIndex == -1 {
		return 0, 0
	}
	x := c.chesses[chessIndex].LocationX
	y := c.chesses[chessIndex].LocationY
	return x, y
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
