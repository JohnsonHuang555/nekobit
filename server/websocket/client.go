// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package socket

import (
	"log"
	"net/http"
	"time"

	"server/controllers"
	"server/middleware"
	"server/models"

	"github.com/gorilla/websocket"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

// connection is an middleman between the websocket connection and the hub.
type connection struct {
	// The websocket connection.
	ws *websocket.Conn

	// Buffered channel of outbound messages.
	send chan MsgData
}

type MsgData struct {
	UserID string     `json:"userID"`
	Event  string     `json:"event"`
	Data   Attachment `json:"data"`
}

// 前端附加資訊
type Attachment struct {
	Name     string      `json:"name"`
	IsMaster bool        `json:"isMaster"`
	IsReady  bool        `json:"isReady"`
	DbData   interface{} `json:"dbData"`
}

// ReadPump pumps messages from the websocket connection to the hub.
func (s subscription) readPump() {
	c := s.conn
	defer func() {
		h.unregister <- s
		c.ws.Close()
	}()
	c.ws.SetReadLimit(maxMessageSize)
	c.ws.SetReadDeadline(time.Now().Add(pongWait))
	c.ws.SetPongHandler(func(string) error { c.ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		var msg MsgData
		err := c.ws.ReadJSON(&msg)

		switch msg.Event {
		case "joinRoom":
			user := models.User{
				ID: msg.UserID,
				Name: msg.Data.Name,
				IsMaster: msg.Data.IsMaster,
				IsReady: msg.Data.IsMaster,
				PlayOrder: 0,
			}
			payload, _ := controllers.JoinRoom(middleware.RoomCollection, user, s.room)
			msg.Data.DbData = payload
		case "leaveRoom":
			payload, _ := controllers.LeaveRoom(middleware.RoomCollection, msg.UserID, s.room)
			msg.Data.DbData = payload
		case "setGameReady":
			payload, _ := controllers.SetGameReady(middleware.RoomCollection, s.room, msg.UserID, msg.Data.IsReady)
			msg.Data.DbData = payload
		case "setGameStart":
			controllers.SetGameStart(middleware.RoomCollection, s.room)
		default:
			log.Printf("Socket error: no match event")
		}

		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway) {
				log.Printf("error: %v", err)
			}
			break
		}
		m := message{msg, s.room}
		h.broadcast <- m
	}
}

// writePump pumps messages from the hub to the websocket connection.
func (s *subscription) writePump() {
	c := s.conn
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.ws.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				c.ws.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			c.ws.WriteJSON(message)
		case <-ticker.C:
			if err := c.ws.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}

// serveWs handles websocket requests from the peer.
func ServeWs(w http.ResponseWriter, r *http.Request, roomID string) {
	go h.run()
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	c := &connection{send: make(chan MsgData), ws: ws}
	s := subscription{c, roomID}
	h.register <- s
	go s.writePump()
	s.readPump()
}
