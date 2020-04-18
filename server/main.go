package main

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

import (
	"fmt"
	"log"
	"server/config"
	"server/infrastructure/datastore"
	"server/infrastructure/router"
	"server/registry"

	"github.com/labstack/echo"
)

func main() {
	config.ReadConfig()
	db := datastore.NewDB()
	r := registry.NewRegistry(db.GameCollection)

	e := echo.New()
	e = router.NewRouter(e, r.NewAppController())

	fmt.Println("Server listen at http://localhost" + ":" + config.C.Server.Address)
	if err := e.Start(":" + config.C.Server.Address); err != nil {
		log.Fatalln(err)
	}
}
