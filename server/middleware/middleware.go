package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"server/controllers"
	"server/models"
)

// DB connection string
// for localhost mongoDB
// const connectionString = "mongodb://localhost:27017"
type RoomView struct {
	RoomService *controllers.RoomService
}

const connectionString = "mongodb://localhost:27017"

// Database Name
const dbName = "GamePlatformDB"

// Collection names
const colAccount = "Account"
const colGame = "Game"
const colRoom = "Room"

// collections object/instance
var GameCollection *mongo.Collection
var RoomCollection *mongo.Collection

var Rv = RoomView{}

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

	// accountCollection = client.Database(dbName).Collection(colAccount)
	GameCollection = client.Database(dbName).Collection(colGame)
	RoomCollection = client.Database(dbName).Collection(colRoom)

	fmt.Println("Collection instance created!")

	Rv.RoomService = controllers.NewRoomService()
}

// GetAllGames 取得所有遊戲
func GetAllGames(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := controllers.GetAllGames(GameCollection)
	json.NewEncoder(w).Encode(payload)
}

// GetGameInfo 取得遊戲資訊
func GetGameInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	payload := controllers.GetGameInfo(GameCollection, params["id"])
	json.NewEncoder(w).Encode(payload)
}

func (r *RoomView) GetRoomList() []models.Room {
	rooms := r.RoomService.List()
	return rooms
}

func (r *RoomView) GetUserList(id int) []models.User {
	userList := r.RoomService.GetUserList(id)
	return userList
}
