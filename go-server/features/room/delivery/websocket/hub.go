package websocket

import (
	"go-server/domain"
)

type message struct {
	data   MsgData
	roomID string
}

type subscription struct {
	conn        *connection
	roomID      string
	roomUseCase domain.RoomUseCase
}

// hub maintains the set of active connections and broadcasts messages to the
// connections.
type hub struct {
	rooms      map[string]map[*connection]bool
	broadcast  chan message
	register   chan subscription
	unregister chan subscription
}

var h = hub{
	broadcast:  make(chan message),
	register:   make(chan subscription),
	unregister: make(chan subscription),
	rooms:      make(map[string]map[*connection]bool),
}

func (h *hub) run() {
	for {
		select {
		case s := <-h.register:
			connections := h.rooms[s.roomID]
			if connections == nil {
				connections = make(map[*connection]bool)
				h.rooms[s.roomID] = connections
			}
			h.rooms[s.roomID][s.conn] = true
		case s := <-h.unregister:
			connections := h.rooms[s.roomID]
			if connections != nil {
				if _, ok := connections[s.conn]; ok {
					delete(connections, s.conn)
					close(s.conn.send)
					if len(connections) == 0 {
						delete(h.rooms, s.roomID)
					}
				}
			}
		case m := <-h.broadcast:
			connections := h.rooms[m.roomID]
			for c := range connections {
				select {
				case c.send <- m.data:
				default:
					close(c.send)
					delete(connections, c)
					if len(connections) == 0 {
						delete(h.rooms, m.roomID)
					}
				}
			}
		}
	}
}
