package presenter

import "server/domain/model"

type gamePresenter struct {
}

type GamePresenter interface {
	ResponseGames(g []*model.Game) []*model.Game
	ResponseOneGame(g *model.Game) *model.Game
}

func NewGamePresenter() GamePresenter {
	return &gamePresenter{}
}

// ResponseGames handles game data before passing it to views
func (gp *gamePresenter) ResponseGames(games []*model.Game) []*model.Game {
	for _, game := range games {
		game.Name = "Test" + game.Name
	}

	return games
}

func (gp *gamePresenter) ResponseOneGame(game *model.Game) *model.Game {
	return game
}
