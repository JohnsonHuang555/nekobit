package middleware

import (
	"server/domain"
)

// SocketEventHandler handle every event from client
func SocketEventHandler(msg MsgData, roomID string, ru domain.RoomUseCase) MsgData {
	switch msg.Event {
	case "getRooms":
		rooms, _ := ru.GetRooms()
		msg.Data.Rooms = rooms
	case "joinRoom":
		users, _ := ru.JoinRoom(roomID, msg.UserID, msg.Data.UserName)
		msg.Data.RoomUserList = users
	case "leaveRoom":
		users, _ := ru.LeaveRoom(roomID, msg.UserID)
		msg.Data.RoomUserList = users
	case "readyGame":
		users, _ := ru.ReadyGame(roomID, msg.UserID)
		msg.Data.RoomUserList = users
	case "startGame":
		room, _ := ru.StartGame(roomID)
		msg.Data.RoomInfo = room
	}
	return msg
}
