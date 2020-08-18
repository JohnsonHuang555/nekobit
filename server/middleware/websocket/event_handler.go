package middleware

import (
	"server/domain"
	ninjafighting "server/domain/ninja_fighting"
	_chineseChessRepo "server/features/chinese_chess/repository"
	_chineseChessUseCase "server/features/chinese_chess/usecase"
	_ninjaFightingRepo "server/features/ninja_fighting/repository"
	_ninjaFightingUseCase "server/features/ninja_fighting/usecase"
	"server/utils"
)

// var roomUseCase domain.RoomUseCase
var chineseChessUseCase domain.ChineseChessUseCase
var ninjaFightingUseCase ninjafighting.NinjaFightingUseCase

// SocketEventHandler handle every event from client
func SocketEventHandler(
	msg MsgData,
	rid string,
	ru domain.RoomUseCase,
) MsgData {
	// init event class
	event := new(Event)
	msgData := event.GetOutputMsg()
	msgData.Event = msg.Event
	msgData.UserID = msg.UserID
	event.SetOutputMsg(msgData)
	event.SetRoomID(rid)
	event.SetUserID(msg.UserID)
	event.SetRoomUseCase(ru)

	roomInfo, _ := ru.GetRoomInfo(rid)
	// e :=
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
				ninjaFightingRepo := _ninjaFightingRepo.NewNinjaFightingRepository(roomInfo.GameData.([]*ninjafighting.MapItem))
				ninjaFightingUseCase = _ninjaFightingUseCase.NewNinjaFightingUseCase(ninjaFightingRepo)
			}
		}
	}
	// switch msg.Event {
	// case "joinRoom":
	// 	room, _ := ru.JoinRoom(roomID, msg.UserID, msg.Data.UserName)
	// 	msg.Data.RoomInfo = room
	// case "leaveRoom":
	// 	users, _ := ru.LeaveRoom(roomID, msg.UserID)
	// 	msg.Data.RoomUserList = users
	// case "readyGame":
	// 	ru.ChooseCharacter(roomID, msg.UserID, msg.Data.CharacterID)
	// 	users, _ := ru.ReadyGame(roomID, msg.UserID)
	// 	msg.Data.RoomUserList = users
	// case "startGame":
	// 	var gd interface{}
	// 	switch msg.Data.GameID {
	// 	case "5d62a35bd986c21bc010c00b": // FIXME:
	// 		// 1 大盤, 2 小盤
	// 		if msg.Data.RoomMode == 1 {
	// 			// mode 1
	// 			gd = domain.CreateChessesStandard()
	// 		} else if msg.Data.RoomMode == 2 {
	// 			// mode 2
	// 			gd = domain.CreateChessesHidden()
	// 		} else {
	// 			// mode 3
	// 		}
	// 	case "5f2976433562709c29a6d940":
	// 		users, _ := ru.ChooseCharacter(roomID, msg.UserID, msg.Data.CharacterID)
	// 		gd = ninjafighting.CreateClassicMap(ninjafighting.Small, users)

	// events := map[string]interface{}{
	// 	"joinRoom":       joinRoom,
	// 	// "leaveRoom":      leaveRoom,
	// 	// "readyGame":      readyGame,
	// 	"startGame": startGame,
	// 	// "setPlayOrder":   setPlayOrder,
	// 	// "gameOver":       gameOver,
	// 	// "changePassword": changePassword,
	// }

	// for k, v := range events {
	// 	switch k {
	// 	case msg.Event:
	// 		v.(func(*Event, string, int, int))(event, msg.Data.GameID, msg.Data.RoomMode, msg.Data.CharacterID)
	// 	}
	// }

	switch msg.Event {
	case "joinRoom":
		joinRoom(event, msg.Data.UserName)
	case "startGame":
		startGame(event, msg.Data.GameID, msg.Data.RoomMode, msg.Data.CharacterID)
	}

	// switch msg.Event {
	// case "joinRoom":
	// 	room, _ := ru.JoinRoom(roomID, msg.UserID, msg.Data.UserName)
	// 	msg.Data.RoomInfo = room
	// case "leaveRoom":
	// 	users, _ := ru.LeaveRoom(roomID, msg.UserID)
	// 	msg.Data.RoomUserList = users
	// case "readyGame":
	// 	users, _ := ru.ReadyGame(roomID, msg.UserID)
	// 	msg.Data.RoomUserList = users
	// case "startGame":
	// 	var gd interface{}
	// 	switch msg.Data.GameID {
	// 	case "5de1f7ddac5b6c1002ece8f1": // FIXME:
	// 		// 1 大盤, 2 小盤
	// 		if msg.Data.RoomMode == 1 {
	// 			// mode 1
	// 			gd = domain.CreateChessesStandard()
	// 		} else if msg.Data.RoomMode == 2 {
	// 			// mode 2
	// 			gd = domain.CreateChessesHidden()
	// 		} else {
	// 			// mode 3
	// 		}
	// 	case "5f2976433562709c29a6d940":
	// 		gd = ninjafighting.CreateClassicMap(ninjafighting.Small)
	// 	}

	// 	//	room, _ := ru.StartGame(roomID, gd)
	// 	//	msg.Data.RoomInfo = room
	// 	msg.Data.GameData = gd
	// case "setPlayOrder":
	// 	rooms, _ := ru.SetPlayOrder(roomID)
	// 	msg.Data.RoomInfo = rooms

	// case "gameOver":
	// 	room, _ := ru.GameOver(roomID)
	// 	msg.Data.RoomInfo = room

	// case "changePassword":
	// 	room, _ := ru.ChangeRoomPassword(roomID, msg.Data.RoomPassword)
	// 	msg.Data.RoomInfo = room

	// // chinese chess
	// case "flipChess":
	// 	gd, side, _ := chineseChessUseCase.FlipChess(msg.Data.ChessID)
	// 	gameData, _ := ru.UpdateGameData(roomID, gd)
	// 	nowPlayer, _ := ru.ChangePlayerTurn(roomID, msg.UserID)
	// 	users, _ := ru.SetPlayerSideIndependence(roomID, msg.UserID, side, domain.TwoSides)
	// 	msg.Data.RoomUserList = users
	// 	msg.Data.GameData = gameData
	// 	msg.Data.NowTurn = nowPlayer
	// case "moveChess":
	// 	gd, _ := chineseChessUseCase.MoveChess(msg.Data.ChessID, msg.Data.LocationX, msg.Data.LocationY)
	// 	gameData, _ := ru.UpdateGameData(roomID, gd)
	// 	nowPlayer, _ := ru.ChangePlayerTurn(roomID, msg.UserID)
	// 	msg.Data.GameData = gameData
	// 	msg.Data.NowTurn = nowPlayer
	// case "eatChess":
	// 	gd, _ := chineseChessUseCase.EatChess(msg.Data.ChessID, msg.Data.TargetID)
	// 	gameData, _ := ru.UpdateGameData(roomID, gd)
	// 	nowPlayer, _ := ru.ChangePlayerTurn(roomID, msg.UserID)
	// 	msg.Data.GameData = gameData
	// 	msg.Data.NowTurn = nowPlayer
	// case "setPlayerSideStandard":
	// 	users, _ := ru.SetPlayerSideIndependence(roomID, msg.UserID, "BLACK", domain.TwoSides)
	// 	msg.Data.RoomUserList = users

	// 	// ninja fighting
	// 	// case ""
	// }
	return event.GetOutputMsg()
}

func joinRoom(event *Event, userName string) {
	msg := event.GetOutputMsg()
	room, _ := event.GetRoomUseCase().JoinRoom(event.GetRoomID(), event.GetUserID(), userName)
	msg.Data.RoomInfo = room
	event.SetOutputMsg(msg)
}

func startGame(event *Event, gameID string, gameMode int, characterID int) {
	msg := event.GetOutputMsg()
	switch gameID {
	case "5de1f7ddac5b6c1002ece8f1": // FIXME:
		// 1 大盤, 2 小盤
		if gameMode == 1 {
			// mode 1
			msg.Data.GameData = domain.CreateChessesStandard()
		} else if gameMode == 2 {
			// mode 2
			msg.Data.GameData = domain.CreateChessesHidden()
		} else {
			// mode 3
		}
	case "5f2976433562709c29a6d940":
		users, _ := event.GetRoomUseCase().ChooseCharacter(event.GetRoomID(), event.GetUserID(), characterID)
		msg.Data.GameData = ninjafighting.CreateClassicMap(ninjafighting.Small, users)
	}

	//	room, _ := ru.StartGame(roomID, gd)
	//	msg.Data.RoomInfo = room
	event.SetOutputMsg(msg)
}
