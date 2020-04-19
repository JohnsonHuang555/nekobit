package repository

import "server/domain/model"

type GameRepository interface {
	FindAll(g []*model.Game) ([]*model.Game, error)
	FindOne(id string) (*model.Game, error)
}
