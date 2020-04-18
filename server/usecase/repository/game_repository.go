package repository

import "server/domain/model"

type GameRepository interface {
	FindAll(g []*model.Game) ([]*model.Game, error)
}
