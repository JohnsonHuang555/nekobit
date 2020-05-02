package middleware

import "server/infrastructure/usecases"

// SocketEventHandler handle every event from client
func SocketEventHandler(msg MsgData, usc usecases.AppUseCase) MsgData {
	switch msg.Event {
	case "getRooms":
		rooms, _ := usc.GetRooms()
		msg.Data.Rooms = rooms
	case "joinRoom":
		users, _ := usc.JoinRoom(msg.Data.RoomID, msg.UserID, msg.Data.Name)
		msg.Data.RoomUserList = users
	case "leaveRoom":
		users, _ := usc.LeaveRoom(msg.Data.RoomID, msg.UserID)
		msg.Data.RoomUserList = users
	case "readyGame":
		users, _ := usc.ReadyGame(msg.Data.RoomID, msg.UserID)
		msg.Data.RoomUserList = users
	case "startGame":
		room, _ := usc.StartGame(msg.Data.RoomID)
		msg.Data.RoomInfo = room
	}
	return msg
}
