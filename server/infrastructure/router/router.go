package router

import (
	"server/interface/controller"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func NewRouter(e *echo.Echo, c controller.AppController) *echo.Echo {
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/api/getAllGames", func(context echo.Context) error { return c.GetGames(context) })

	return e
}
