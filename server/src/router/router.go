package router

import (
	"middleware"

	"github.com/gorilla/mux"
)

// var upgrader = websocket.Upgrader{
// 	ReadBufferSize: 1024,
// 	WriteBufferSize: 1024,
// }

// func reader(conn *websocket.Conn) {
// 	for {
// 		messageType, p, err := conn.ReadMessage()
// 		if err != nil {
// 			log.Println(err)
// 			return
// 		}

// 		log.Println(string(p))
// 		if err := conn.WriteMessage(messageType, p); err != nil {
// 			log.Println(err)
// 			return
// 		}
// 	}
// }

// func wsEndpoint(w http.ResponseWriter, r *http.Request) {
// 	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

// 	ws, err := upgrader.Upgrade(w, r, nil)

// 	if err != nil {
// 		log.Println(err)
// 	}

// 	log.Println("Client Successfully connected...")

// 	reader(ws)
// }

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/getAllGames", middleware.GetAllGames).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/getGameInfo/{name}", middleware.GetGameInfo).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/getRooms/{name}", middleware.GetRooms).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/getRoomInfo/{id}", middleware.GetRoomInfo).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/createRoom", middleware.CreateRoom).Methods("POST", "OPTIONS")

	router.HandleFunc("/ws", middleware.WsEndpoint)
	return router
}
