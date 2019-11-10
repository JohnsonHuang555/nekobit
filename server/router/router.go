package router

import (
	"net/http"
	"server/middleware"
	socket "server/websocket"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {
	hub := socket.NewHub()
	go hub.Run()
	router := mux.NewRouter()

	router.HandleFunc("/api/getAllGames", middleware.GetAllGames).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/getGameInfo/{name}", middleware.GetGameInfo).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/getRooms/{name}", middleware.GetRooms).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/getRoomInfo/{id}", middleware.GetRoomInfo).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/createRoom", middleware.CreateRoom).Methods("POST", "OPTIONS")

	router.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		socket.ServeWs(hub, w, r)
	})
	return router
}
