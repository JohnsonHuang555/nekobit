package main

import (
	"database/sql"
	"fmt"

	"go-server/domain"

	_gameHandlerHttpDelivery "go-server/features/game/delivery/http"
	_gameRepo "go-server/features/game/repository"
	_gameUsecase "go-server/features/game/usecase"

	_roomHandlerHttpDelivery "go-server/features/room/delivery/http"
	_roomHandlerWebSocketDelivery "go-server/features/room/delivery/websocket"
	_roomRepo "go-server/features/room/repository"
	_roomUsecase "go-server/features/room/usecase"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

func init() {
	viper.SetConfigFile(".env")
	viper.SetConfigType("dotenv")
	if err := viper.ReadInConfig(); err != nil {
		logrus.Fatal("Fatal error config file: %v\n", err)
	}
}

func main() {
	logrus.Info("HTTP server started")

	restfulHost := viper.GetString("RESTFUL_HOST")
	restfulPort := viper.GetString("RESTFUL_PORT")
	dbHost := viper.GetString("DB_HOST")
	dbDatabase := viper.GetString("DB_DATABASE")
	dbUser := viper.GetString("DB_USER")
	dbPassword := viper.GetString("DB_PASSWORD")

	db, err := sql.Open(
		"postgres",
		fmt.Sprintf("host=%s user=%s password=%s dbname=%s sslmode=disable", dbHost, dbUser, dbPassword, dbDatabase),
	)
	if err != nil {
		logrus.Fatal(err)
	}
	if err = db.Ping(); err != nil {
		logrus.Fatal(err)
	}

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://127.0.0.1:8080"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	gameRepo := _gameRepo.NewpostgreSqlGameRepository(db)
	gameUseCase := _gameUsecase.NewGameUseCase(gameRepo)
	_gameHandlerHttpDelivery.NewGameHandler(e, gameUseCase)
	rooms := []*domain.Room{}

	roomRepo := _roomRepo.NewRoomRepository(rooms)
	roomUseCase := _roomUsecase.NewRoomUseCase(roomRepo)
	_roomHandlerHttpDelivery.NewRoomHttpHandler(e, roomUseCase)
	_roomHandlerWebSocketDelivery.NewRoomWebSocketHandler(e, roomUseCase)

	logrus.Fatal(e.Start(restfulHost + ":" + restfulPort))
}
