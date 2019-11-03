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
	"github.com/gorilla/websocket"

	"controllers/gamecontroller"
	"controllers/roomcontroller"

	"models/roomModel"
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
const colRoom = "Room"

// collections object/instance
var gameCollection *mongo.Collection
var roomCollection *mongo.Collection

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
	gameCollection = client.Database(dbName).Collection(colGame)
	roomCollection = client.Database(dbName).Collection(colRoom)

	fmt.Println("Collection instance created!")
}

var upgrader = websocket.Upgrader{
	ReadBufferSize: 1024,
	WriteBufferSize: 1024,
}

func reader(conn *websocket.Conn) {
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		log.Println(string(p))
		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

// GetAllGames 取得所有遊戲
func GetAllGames(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	payload := gamecontroller.GetAllGames(gameCollection)
	json.NewEncoder(w).Encode(payload)
}

// GetGameInfo 取得遊戲資訊
func GetGameInfo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	payload := gamecontroller.GetGameInfo(gameCollection, params["name"])
	json.NewEncoder(w).Encode(payload)
}

// GetRooms 取得該遊戲的所有房間
func GetRooms(w http.ResponseWriter, r*http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	payload := roomcontroller.GetRooms(roomCollection, params["name"])
	json.NewEncoder(w).Encode(payload)
}

// GetRoomInfo 取得房間資訊
func GetRoomInfo(w http.ResponseWriter, r*http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	params := mux.Vars(r)
	payload := roomcontroller.GetRoomInfo(roomCollection, params["id"])
	json.NewEncoder(w).Encode(payload)
}

// CreateRoom 創建新房間
func CreateRoom(w http.ResponseWriter, r*http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	var room roomModel.Room
	_ = json.NewDecoder(r.Body).Decode(&room)
	payload := roomcontroller.CreateRoom(roomCollection, room)
	json.NewEncoder(w).Encode(payload)
}

// WsEndpoint
func WsEndpoint(w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	ws, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println(err)
	}

	log.Println("Client Successfully connected...")

	reader(ws)
}
