package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"controllers"
)

// DB connection string
// for localhost mongoDB
// const connectionString = "mongodb://localhost:27017"
const connectionString = "mongodb://localhost:27017"

// Database Name
const dbName = "GamePlatformDB"

// Collection names
const colAccount = "Account"
const colGame = "Game"

// collection object/instance
var collection *mongo.Collection

// create connection with mongo db
func init() {

	// Set client options
	clientOptions := options.Client().ApplyURI(connectionString)

	// connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!!")

	collection = client.Database(dbName).Collection(colAccount)
	collection = client.Database(dbName).Collection(colGame)

	fmt.Println("Collection instance created!")
}

// GetAllGames get all the game route
func GetAllGames(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := gamecontroller.GetAllGames(collection)
	json.NewEncoder(w).Encode(payload)
}
