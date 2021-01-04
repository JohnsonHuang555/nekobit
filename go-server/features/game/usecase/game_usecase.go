package usecase

import "go-server/domain"

type gameUseCase struct {
	gameRepo domain.GameRepository
}

func NewGameUseCase(gameRepo domain.GameRepository) domain.GameUseCase {
	return &gameUseCase{gameRepo}
}

func (gu *gameUseCase) GetGames() (res []*domain.Game, err error) {
	res, err = gu.gameRepo.FindAll()
	if err != nil {
		return nil, err
	}

	return res, nil
}

func (gu *gameUseCase) GetGameInfo(gamePack string) (res *domain.Game, err error) {
	res, err = gu.gameRepo.FindOneByID(gamePack)
	if err != nil {
		return nil, err
	}
	return res, nil
}
