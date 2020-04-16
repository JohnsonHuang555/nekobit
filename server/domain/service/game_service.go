package service

import (
	"server/domain/repository"
)

type GameService struct {
	reop repository.GameRepository
}

func NewGameService(repo repository.GameRepository) *GameService {
	return &GameService{
		reop: repo,
	}
}
