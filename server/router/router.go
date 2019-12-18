package router

import (
	"net/http"
	"server/middleware"
	socket "server/websocket"

	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/api/getAllGames", middleware.GetAllGames).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/getGameInfo/{id}", middleware.GetGameInfo).Methods("GET", "OPTIONS")
	router.HandleFunc("/ws/{roomID}", func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		socket.ServeWs(w, r, params["roomID"])
	})
	return router
}
