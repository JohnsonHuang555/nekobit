package interactor

import (
	"server/domain/model"
	"server/usecase/presenter"
	"server/usecase/repository"
)

type gameInteractor struct {
	GameRepository repository.GameRepository
	GamePresenter  presenter.GamePresenter
}

type GameInteractor interface {
	Get(g []*model.Game) ([]*model.Game, error)
}

func NewGameInteractor(r repository.GameRepository, p presenter.GamePresenter) GameInteractor {
	return &gameInteractor{r, p}
}

func (game *gameInteractor) Get(g []*model.Game) ([]*model.Game, error) {
	g, err := game.GameRepository.FindAll(g)
	if err != nil {
		return nil, err
	}

	return game.GamePresenter.ResponseGames(g), nil
}
