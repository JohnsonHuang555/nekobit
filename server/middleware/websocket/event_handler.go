package middleware

import (
	"server/domain"
	_chineseChessRepo "server/features/chinese_chess/repository"
	_chineseChessUseCase "server/features/chinese_chess/usecase"
	"server/utils"
)

var chineseChessUseCase domain.ChineseChessUseCae

// SocketEventHandler handle every event from client
func SocketEventHandler(
	msg MsgData,
	roomID string,
	ru domain.RoomUseCase,
) MsgData {
	roomInfo, _ := ru.GetRoomInfo(roomID)
	if !utils.IsNil(roomInfo) {
		// 判斷是否開始遊戲
		if roomInfo.GameData != nil {
			switch roomInfo.GameID {
			// 象棋
			case "5d62a35bd986c21bc010c00b":
				chineseChessRepo := _chineseChessRepo.NewChineseChessRepository(roomInfo.GameData.([]*domain.ChineseChess))
				chineseChessUseCase = _chineseChessUseCase.NewChineseChessUseCase(chineseChessRepo)
			}
		}
	}
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
		var gd interface{}
		switch msg.Data.GameID {
		case "5d62a35bd986c21bc010c00b": // FIXME:
			// 1 大盤, 2 小盤
			if msg.Data.RoomMode == 2 {
				gd = domain.CreateChessesHidden()
			}
		}

		room, _ := ru.StartGame(roomID, gd)
		msg.Data.RoomInfo = room

	case "setPlayOrder":
		rooms, _ := ru.SetPlayOrder(roomID)
		msg.Data.RoomInfo = rooms

	// chinese chess
	case "flipChess":
		gd, side, _ := chineseChessUseCase.FlipChess(msg.Data.ChessID)
		gameData, _ := ru.UpdateGameData(roomID, gd)
		nowPlayer, _ := ru.ChangePlayerTurn(roomID, msg.UserID)
		users, _ := ru.SetPlayerSide(roomID, msg.UserID, side)
		msg.Data.RoomUserList = users
		msg.Data.GameData = gameData
		msg.Data.NowTurn = nowPlayer
	case "moveChess":
		gd, _ := chineseChessUseCase.MoveChess(msg.Data.ChessID, msg.Data.LocationX, msg.Data.LocationY)
		gameData, _ := ru.UpdateGameData(roomID, gd)
		nowPlayer, _ := ru.ChangePlayerTurn(roomID, msg.UserID)
		msg.Data.GameData = gameData
		msg.Data.NowTurn = nowPlayer
	case "eatChess":
		gd, _ := chineseChessUseCase.EatChess(msg.Data.ChessID, msg.Data.TargetID)
		gameData, _ := ru.UpdateGameData(roomID, gd)
		nowPlayer, _ := ru.ChangePlayerTurn(roomID, msg.UserID)
		msg.Data.GameData = gameData
		msg.Data.NowTurn = nowPlayer
	}
	return msg
}
