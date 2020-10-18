package usecase

import "server/domain"

type gameUseCase struct {
	gameRepo domain.GameRepository
}

// NewGameUseCase will create new an gameUseCase object representation of domain.GameUseCase interface
func NewGameUseCase(g domain.GameRepository) domain.GameUseCase {
	return &gameUseCase{g}
}

func (gu *gameUseCase) GetGames() ([]*domain.Game, error) {
	var games []*domain.Game
	games, err := gu.gameRepo.FindAll(games)
	if err != nil {
		return nil, err
	}
	return games, nil
}

func (gu *gameUseCase) GetGameInfo(id string) (*domain.Game, error) {
	var game *domain.Game
	game, err := gu.gameRepo.FindOne(id)
	if err != nil {
		return nil, err
	}
	return game, nil
}
