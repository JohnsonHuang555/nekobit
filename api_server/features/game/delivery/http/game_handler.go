package http

import (
	"net/http"
	"server/domain"
	"strconv"

	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
)

// ResponseError represent the response error struct
type ResponseError struct {
	Message string `json:"message"`
}

// GameHandler represent the httphandler for game
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
	numS := c.QueryParam("num")
	num, _ := strconv.Atoi(numS)
	cursor := c.QueryParam("cursor")
	ctx := c.Request().Context()

	listAr, nextCursor, err := g.GUseCase.GetGames(ctx, cursor, int64(num))
	if err != nil {
		return c.JSON(getStatusCode(err), ResponseError{Message: err.Error()})
	}

	c.Response().Header().Set(`X-Cursor`, nextCursor)
	return c.JSON(http.StatusOK, listAr)
}

// GetGameInfo will get the game by given id
func (g *GameHandler) GetGameInfo(c echo.Context) error {
	idP, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusNotFound, domain.ErrNotFound.Error())
	}

	id := int64(idP)
	ctx := c.Request().Context()

	art, err := g.GUseCase.GetGameInfo(ctx, id)
	if err != nil {
		return c.JSON(getStatusCode(err), ResponseError{Message: err.Error()})
	}

	return c.JSON(http.StatusOK, art)
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
