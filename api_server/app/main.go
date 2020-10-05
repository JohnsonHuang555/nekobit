package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/url"
	"server/app/config"
	"time"

	_ "github.com/go-sql-driver/mysql"

	"github.com/labstack/echo"

	_gameHttpDelivery "server/features/game/delivery/http"
	_gameHttpDeliveryMiddleware "server/features/game/delivery/http/middleware"
	_gameRepo "server/features/game/repository/mysql"
	_gameUseCase "server/features/game/usecase"
)

func init() {
	config.ReadConfig()
}

func main() {
	dbHost := config.C.Database.Host
	dbPort := config.C.Database.Port
	dbUser := config.C.Database.User
	dbPass := config.C.Database.Pass
	dbName := config.C.Database.Name
	connection := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", dbUser, dbPass, dbHost, dbPort, dbName)
	fmt.Println(connection)
	val := url.Values{}
	val.Add("parseTime", "1")
	val.Add("loc", "Asia/Jakarta")
	dsn := fmt.Sprintf("%s?%s", connection, val.Encode())
	dbConn, err := sql.Open(`mysql`, dsn)

	if err != nil {
		log.Fatal(err)
	}
	err = dbConn.Ping()
	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		err := dbConn.Close()
		if err != nil {
			log.Fatal(err)
		}
	}()

	e := echo.New()
	middL := _gameHttpDeliveryMiddleware.InitMiddleware()
	e.Use(middL.CORS)
	gr := _gameRepo.NewGameRepository(dbConn)

	timeoutContext := time.Duration(2) * time.Second
	gu := _gameUseCase.NewGameUseCase(gr, timeoutContext)
	_gameHttpDelivery.NewGameHandler(e, gu)

	log.Fatal(e.Start(config.C.Server.Address))
}
