package middleware

import (
	"fmt"
	"server/domain"
	ninjafighting "server/domain/ninja_fighting"
	_chineseChessRepo "server/features/chinese_chess/repository"
	_chineseChessUseCase "server/features/chinese_chess/usecase"
	_ninjaFightingRepo "server/features/ninja_fighting/repository"
	_ninjaFightingUseCase "server/features/ninja_fighting/usecase"
	"server/utils"
)

var chineseChessUseCase domain.ChineseChessUseCae
var ninjaFightingUseCase ninjafighting.NinjaFightingUseCase

// SocketEventHandler handle every event from client
func SocketEventHandler(
	msg MsgData,
	roomID string,
	ru domain.RoomUseCase,
) MsgData {
	roomInfo, _ := ru.GetRoomInfo(roomID)
	fmt.Println(roomInfo)
	if !utils.IsNil(roomInfo) {
		// 判斷是否開始遊戲
		if roomInfo.GameData != nil {
			switch roomInfo.GameID {
			// 象棋
			case "5d62a35bd986c21bc010c00b":
				chineseChessRepo := _chineseChessRepo.NewChineseChessRepository(roomInfo.GameData.([]*domain.ChineseChess))
				chineseChessUseCase = _chineseChessUseCase.NewChineseChessUseCase(chineseChessRepo)
			// Ninja Fighting
			case "5f2976433562709c29a6d940":
				fmt.Println(2)
				ninjaFightingRepo := _ninjaFightingRepo.NewNinjaFightingRepository(roomInfo.GameData.([]*ninjafighting.MapItem))
				ninjaFightingUseCase = _ninjaFightingUseCase.NewNinjaFightingUseCase(ninjaFightingRepo)
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
		case "5d62a35bd986c21bc010c00b":
			// 1 大盤, 2 小盤
			if msg.Data.RoomMode == 1 {
				// mode 1
				gd = domain.CreateChessesStandard()
			} else if msg.Data.RoomMode == 2 {
				// mode 2
				gd = domain.CreateChessesHidden()
			} else {
				// mode 3
			}
		case "5f2976433562709c29a6d940":
			gd = ninjafighting.CreateClassicMap(ninjafighting.Small)
		}

		//	room, _ := ru.StartGame(roomID, gd)
		//	msg.Data.RoomInfo = room
		msg.Data.GameData = gd
	case "setPlayOrder":
		rooms, _ := ru.SetPlayOrder(roomID)
		msg.Data.RoomInfo = rooms

	case "gameOver":
		room, _ := ru.GameOver(roomID)
		msg.Data.RoomInfo = room

	case "changePassword":
		room, _ := ru.ChangeRoomPassword(roomID, msg.Data.RoomPassword)
		msg.Data.RoomInfo = room

	// chinese chess
	case "flipChess":
		gd, side, _ := chineseChessUseCase.FlipChess(msg.Data.ChessID)
		gameData, _ := ru.UpdateGameData(roomID, gd)
		nowPlayer, _ := ru.ChangePlayerTurn(roomID, msg.UserID)
		users, _ := ru.SetPlayerSideIndependence(roomID, msg.UserID, side, domain.TwoSides)
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
	case "setPlayerSideStandard":
		users, _ := ru.SetPlayerSideIndependence(roomID, msg.UserID, "BLACK", domain.TwoSides)
		msg.Data.RoomUserList = users

		// ninja fighting
		// case ""
	}
	return msg
}
