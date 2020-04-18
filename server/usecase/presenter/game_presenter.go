package presenter

import "server/domain/model"

type GamePresenter interface {
	ResponseGames(g []*model.Game) []*model.Game
}
