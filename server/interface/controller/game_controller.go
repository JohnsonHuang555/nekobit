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
	GetGameInfo(c Context) error
}

func NewGameController(game interactor.GameInteractor) GameController {
	return &gameController{game}
}

func (gc *gameController) GetGames(c Context) error {
	var g []*model.Game

	g, err := gc.gameInteractor.Get(g)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, g)
}

func (gc *gameController) GetGameInfo(c Context) error {
	var g *model.Game
	// name := c.QueryParam("name")

	g, err := gc.gameInteractor.GetOne(g.ID.Hex())
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, g)
}
