package middleware

import (
	"server/domain"
)

// SocketEventHandler handle every event from client
func SocketEventHandler(
	msg MsgData,
	roomID string,
	ru domain.RoomUseCase,
	ccu domain.ChineseChessUseCae,
) MsgData {
	switch msg.Event {
	case "getRooms":
		rooms, _ := ru.GetRooms()
		msg.Data.Rooms = rooms
	case "joinRoom":
		room, _ := ru.JoinRoom(roomID, msg.UserID, msg.Data.UserName)
		msg.Data.RoomInfo = room
	case "leaveRoom":
		users, _ := ru.LeaveRoom(roomID, msg.UserID)
		msg.Data.RoomUserList = users
	case "readyGame":
		users, _ := ru.ReadyGame(roomID, msg.UserID)
		msg.Data.RoomUserList = users
	case "startGame":
		gd, _ := ccu.GetNewChess()
		gameData, _ := ru.UpdateGameData(roomID, gd)
		room, _ := ru.StartGame(roomID, gameData)
		msg.Data.RoomInfo = room

	// chinese chess
	case "flipChess":
		gd, _ := ccu.FlipChess(msg.Data.ChessID)
		gameData, _ := ru.UpdateGameData(roomID, gd)
		msg.Data.GameData = gameData
	case "moveChess":
		gd, _ := ccu.MoveChess(msg.Data.ChessID, msg.Data.LocationX, msg.Data.LocationY)
		gameData, _ := ru.UpdateGameData(roomID, gd)
		msg.Data.GameData = gameData
	case "eatChess":
		gd, _ := ccu.EatChess(msg.Data.ChessID, msg.Data.TargetID)
		gameData, _ := ru.UpdateGameData(roomID, gd)
		msg.Data.GameData = gameData
	}
	return msg
}
