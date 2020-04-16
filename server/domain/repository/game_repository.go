package repository

import (
	"server/domain/model"
)

type GameRepository interface {
	FindAll() ([]*model.Game, error)
	FindByID(id string) (*model.Game, error)
}
