package controller

import (
	"net/http"

	"server/domain/model"
	"server/usecase/interactor"
)

type gameController struct {
	gameInteractor interactor.GameInteractor
}

type GameController interface {
	GetGames(c Context) error
}

func NewGameController(game interactor.GameInteractor) GameController {
	return &gameController{game}
}

func (game *gameController) GetGames(c Context) error {
	var g []*model.Game

	g, err := game.gameInteractor.Get(g)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, g)
}
