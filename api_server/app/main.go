package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/url"
	"server/app/config"

	_ "github.com/go-sql-driver/mysql"

	"github.com/labstack/echo"
)

// "database/sql"

// "log"
// "net/url"
// "time"

// _ "github.com/go-sql-driver/mysql"
// "github.com/labstack/echo"

// _articleHttpDelivery "github.com/bxcodec/go-clean-arch/article/delivery/http"
// _articleHttpDeliveryMiddleware "github.com/bxcodec/go-clean-arch/article/delivery/http/middleware"
// _articleRepo "github.com/bxcodec/go-clean-arch/article/repository/mysql"
// _articleUcase "github.com/bxcodec/go-clean-arch/article/usecase"
// _authorRepo "github.com/bxcodec/go-clean-arch/author/repository/mysql"

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
	// middL := _articleHttpDeliveryMiddleware.InitMiddleware()
	// e.Use(middL.CORS)
	// authorRepo := _authorRepo.NewMysqlAuthorRepository(dbConn)
	// ar := _articleRepo.NewMysqlArticleRepository(dbConn)

	// timeoutContext := time.Duration(viper.GetInt("context.timeout")) * time.Second
	// au := _articleUcase.NewArticleUsecase(ar, authorRepo, timeoutContext)
	// _articleHttpDelivery.NewArticleHandler(e, au)

	log.Fatal(e.Start(config.C.Server.Address))
}
