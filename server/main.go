package main

import (
	"log"
	"server/config"
	"server/domain"
	"server/infrastructure/datastore"

	_gameDelivery "server/features/game/delivery"
	_gameRepo "server/features/game/repository"
	_gameUseCase "server/features/game/usecase"

	_roomDelivery "server/features/room/delivery"
	_roomRepo "server/features/room/repository"
	_roomUseCase "server/features/room/usecase"

	_httpDeliveryMiddleware "server/middleware/http"

	"github.com/labstack/echo"
)

func main() {
	config.ReadConfig()
	db := datastore.NewDB()
	e := echo.New()
	middL := _httpDeliveryMiddleware.InitMiddleware()
	e.Use(middL.CORS)
	gameRepo := _gameRepo.NewGameRepository(db)
	gameUseCase := _gameUseCase.NewGameUseCase(gameRepo)
	_gameDelivery.NewGameHandler(e, gameUseCase)

	var rooms []*domain.Room
	var roomNum int = 0
	roomRepo := _roomRepo.NewRoomRepository(rooms, roomNum)
	roomUseCase := _roomUseCase.NewRoomUseCase(roomRepo)
	_roomDelivery.NewRoomHandler(e, roomUseCase)

	if err := e.Start(":" + config.C.Server.Address); err != nil {
		log.Fatalln(err)
	}
}
