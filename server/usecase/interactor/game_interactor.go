// interactor is in charge of Input Port
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
	GetOne(id string) (*model.Game, error)
}

func NewGameInteractor(r repository.GameRepository, p presenter.GamePresenter) GameInteractor {
	return &gameInteractor{r, p}
}

func (gi *gameInteractor) Get(g []*model.Game) ([]*model.Game, error) {
	g, err := gi.GameRepository.FindAll(g)
	if err != nil {
		return nil, err
	}

	return gi.GamePresenter.ResponseGames(g), nil
}

func (gi *gameInteractor) GetOne(id string) (*model.Game, error) {
	var g *model.Game
	g, err := gi.GameRepository.FindOne(id)
	if err != nil {
		return g, err
	}

	return gi.GamePresenter.ResponseOneGame(g), nil
}

func (gi *gameInteractor) RemoveOne() {

}
