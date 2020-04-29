package main

import (
	"log"
	"server/config"
	"server/infrastructure/datastore"

	_gameHttpDelivery "server/game/delivery/http"
	_gameHttpDeliveryMiddleware "server/game/delivery/http/middleware"
	_gameRepo "server/game/repository"
	_gameUseCase "server/game/usecase"

	"github.com/labstack/echo"
)

// import (
// 	"fmt"
// 	"log"
// 	"net/http"
// 	"server/router"
// )

// func main() {
// 	r := router.Router()
// 	fmt.Println("Starting server on the port 8080...")
// 	log.Fatal(http.ListenAndServe(":8080", r))
// }

// import (
// 	"fmt"
// 	"log"
// 	"server/config"
// 	"server/infrastructure/datastore"
// 	"server/infrastructure/router"
// 	"server/registry"

// 	"github.com/labstack/echo"
// )

// func main() {
// 	config.ReadConfig()
// 	db := datastore.NewDB()
// 	r := registry.NewRegistry(db)

// 	e := echo.New()
// 	e = router.NewRouter(e, r.NewAppController())

// 	fmt.Println("Server listen at http://localhost" + ":" + config.C.Server.Address)
// 	if err := e.Start(":" + config.C.Server.Address); err != nil {
// 		log.Fatalln(err)
// 	}
// }

func main() {
	config.ReadConfig()
	db := datastore.NewDB()
	e := echo.New()
	middL := _gameHttpDeliveryMiddleware.InitMiddleware()
	e.Use(middL.CORS)
	gameRepo := _gameRepo.NewGameRepository(db)
	gameUseCase := _gameUseCase.NewGameUseCase(gameRepo)
	_gameHttpDelivery.NewGameHandler(e, gameUseCase)

	if err := e.Start(":" + config.C.Server.Address); err != nil {
		log.Fatalln(err)
	}
}
