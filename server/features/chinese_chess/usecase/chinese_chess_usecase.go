package usecase

import (
	"server/domain"
)

type chineseChessUseCase struct {
	chineseChessRepo domain.ChineseChessRepository
}

func NewChineseChessUseCase(c domain.ChineseChessRepository) domain.ChineseChessUseCae {
	return &chineseChessUseCase{c}
}

func (cu *chineseChessUseCase) GetNewChess() ([]*domain.ChineseChess, error) {
	chesses, err := cu.chineseChessRepo.Create()
	if err != nil {
		return nil, err
	}

	return chesses, nil
}

func (cu *chineseChessUseCase) EatChess(id int, targetID int) ([]*domain.ChineseChess, error) {
	err := cu.chineseChessRepo.UpdateAlive(targetID, false)
	if err != nil {
		return nil, err
	}

	x, y := cu.chineseChessRepo.GetChessLocation(targetID)
	err = cu.chineseChessRepo.UpdateLocation(id, x, y)
	if err != nil {
		return nil, err
	}

	chesses := cu.chineseChessRepo.FindAll()
	return chesses, nil
}

func (cu *chineseChessUseCase) MoveChess(id int, locationX int, locationY int) ([]*domain.ChineseChess, error) {
	err := cu.chineseChessRepo.UpdateLocation(id, locationX, locationY)
	if err != nil {
		return nil, err
	}

	chesses := cu.chineseChessRepo.FindAll()
	return chesses, nil
}

func (cu *chineseChessUseCase) FlipChess(id int) ([]*domain.ChineseChess, error) {
	err := cu.chineseChessRepo.UpdateIsFlipped(id)
	if err != nil {
		return nil, err
	}

	chesses := cu.chineseChessRepo.FindAll()
	return chesses, nil
}
