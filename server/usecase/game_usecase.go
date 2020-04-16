package usecase

import (
	"server/domain/model"
	"server/domain/repository"
	"server/domain/service"
)

type GameUsecase interface {
	GetAllGames() []*Game
}

type gameUsecase struct {
	repo    repository.GameRepository
	service *service.GameService
}

func NewGameUsecase(repo repository.GameRepository, service *service.GameService) *gameUsecase {
	return &gameUsecase{
		repo:    repo,
		service: service,
	}
}

func (g *gameUsecase) GetAllGames() ([]*Game, error) {
	games, err := g.repo.FindAll()
	if err != nil {
		return nil, err
	}
	return toGame(games), err
}

type Game struct {
	ID           string
	Name         string
	MaxPlayers   int
	Rules        []string
	Brief        string
	Description  string
	ImgURL       string
	EstimateTime int
	CreatedDate  string
}

func toGame(games []*model.Game) []*Game {
	res := make([]*Game, len(games))
	for i, game := range games {
		g := game.GetGame()
		res[i] = &Game{}
	}
	return res
}
