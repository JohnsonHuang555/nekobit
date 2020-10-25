package http

import (
	"go-server/domain"
	"go-server/utils"
	"net/http"

	"github.com/labstack/echo"
)

type GameHandler struct {
	GameUseCase domain.GameUseCase
}

func NewGameHandler(e *echo.Echo, gus domain.GameUseCase) {
	handler := &GameHandler{
		GameUseCase: gus,
	}

	e.GET("/api/games", handler.GetGames)
	e.GET("/api/games/:id", handler.GetGameInfo)
}

// GetGames will fetch the all games
func (g *GameHandler) GetGames(c echo.Context) error {
	games, err := g.GameUseCase.GetGames()

	if err != nil {
		return c.JSON(utils.GetStatusCode(err), utils.ResponseError{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, games)
}

// GetGameInfo will get the game by given id
func (g *GameHandler) GetGameInfo(c echo.Context) error {
	id := c.Param("id")

	game, err := g.GameUseCase.GetGameInfo(id)
	if err != nil {
		return c.JSON(utils.GetStatusCode(err), utils.ResponseError{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, game)
}
