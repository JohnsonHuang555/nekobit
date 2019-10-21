package router

import (
	"middleware"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {

	router := mux.NewRouter()

	router.HandleFunc("/api/getAllGames", middleware.GetAllGames).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/getGameInfo/{name}", middleware.GetGameInfo).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/getRooms/{name}", middleware.GetRooms).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/getRoomInfo/{id}", middleware.GetRoomInfo).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/createRoom", middleware.CreateRoom).Methods("POST", "OPTIONS")
	return router
}
