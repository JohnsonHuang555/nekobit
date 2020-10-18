package main

import (
	"log"
	"math/rand"
	"server/config"
	"server/domain"
	"server/infrastructure/datastore"
	"time"

	_gameDelivery "server/features/game/delivery"
	_gameRepo "server/features/game/repository"
	_gameUseCase "server/features/game/usecase"

	_roomDelivery "server/features/room/delivery"
	_roomRepo "server/features/room/repository"
	_roomUseCase "server/features/room/usecase"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	rand.Seed(time.Now().UTC().UnixNano())

	var rooms []*domain.Room
	var roomNum int = 0

	config.ReadConfig()
	db := datastore.NewDB()

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://127.0.0.1:8080"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	gameRepo := _gameRepo.NewGameRepository(db)
	gameUseCase := _gameUseCase.NewGameUseCase(gameRepo)
	_gameDelivery.NewGameHandler(e, gameUseCase)

	roomRepo := _roomRepo.NewRoomRepository(rooms, roomNum)
	roomUseCase := _roomUseCase.NewRoomUseCase(roomRepo)
	_roomDelivery.NewRoomHandler(e, roomUseCase)

	if err := e.Start(":" + config.C.Server.Address); err != nil {
		log.Fatalln(err)
	}
}
