package http

import (
	"net/http"
	"server/domain"

	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
)

// ResponseError represent the reseponse error struct
type ResponseError struct {
	Message string `json:"message"`
}

// GameHandler  represent the httphandler for article
type GameHandler struct {
	GUseCase domain.GameUseCase
}

// NewGameHandler will initialize the games/ resources endpoint
func NewGameHandler(e *echo.Echo, us domain.GameUseCase) {
	handler := &GameHandler{
		GUseCase: us,
	}
	e.GET("/api/getAllGames", handler.GetGames)
	e.GET("/api/getGameInfo", handler.GetGameInfo)
}

// GetGames will fetch the all games
func (g *GameHandler) GetGames(c echo.Context) error {
	res, err := g.GUseCase.GetGames()
	if err != nil {
		return c.JSON(getStatusCode(err), ResponseError{Message: err.Error()})
	}
	return c.JSON(http.StatusOK, res)
}

// GetGameInfo will get the game by given id
func (g *GameHandler) GetGameInfo(c echo.Context) error {
	var game *domain.Game
	id := c.QueryParam("id")
	game, err := g.GUseCase.GetGameInfo(id)
	if err != nil {
		return c.JSON(getStatusCode(err), ResponseError{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, game)
}

func getStatusCode(err error) int {
	if err == nil {
		return http.StatusOK
	}

	logrus.Error(err)
	switch err {
	case domain.ErrInternalServerError:
		return http.StatusInternalServerError
	case domain.ErrNotFound:
		return http.StatusNotFound
	case domain.ErrConflict:
		return http.StatusConflict
	default:
		return http.StatusInternalServerError
	}
}
