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
	if !utils.IsNil(roomInfo) {
		// 判斷是否開始遊戲
		if roomInfo.GameData != nil {
			switch roomInfo.GameID {
			// 象棋
			case "5de1f7ddac5b6c1002ece8f1":
				chineseChessRepo := _chineseChessRepo.NewChineseChessRepository(roomInfo.GameData.([]*domain.ChineseChess))
				chineseChessUseCase := _chineseChessUseCase.NewChineseChessUseCase(chineseChessRepo)
				event.SetChineseChessUseCase(chineseChessUseCase)
			// Ninja Fighting
			case "5f2976433562709c29a6d940":
				ninjaFightingRepo := _ninjaFightingRepo.NewNinjaFightingRepository(roomInfo.GameData.(*ninjafighting.GameData))
				ninjaFightingUseCase := _ninjaFightingUseCase.NewNinjaFightingUseCase(ninjaFightingRepo)
				event.SetNinjaFightingUseCase(ninjaFightingUseCase)
			}
		}
	}

	switch msg.Event {
	case "joinRoom":
		joinRoom(event, msg.Data.UserName)
	case "startGame":
		startGame(event, msg.Data.GameID, msg.Data.RoomMode, msg.Data.CharacterID, msg.Data.Group)
	case "leaveRoom":
		leaveRoom(event)
	case "readyGame":
		readyGame(event)
	case "gameOver":
		gameOver(event)
	case "changePassword":
		changePassword(event, msg.Data.RoomPassword)
	// chinese chess
	case "flipChess":
		flipChess(event, msg.Data.ChessID)
	case "moveChess":
		moveChess(event, msg.Data.ChessID, msg.Data.LocationX, msg.Data.LocationY)
	case "eatChess":
		eatChess(event, msg.Data.ChessID, msg.Data.TargetID)
	case "setPlayerSideStandard":
		setPlayerSideStandard(event)
	}

	return event.GetOutputMsg()
}

func joinRoom(event *Event, userName string) {
	msg := event.GetOutputMsg()
	room, _ := event.GetRoomUseCase().JoinRoom(event.GetRoomID(), event.GetUserID(), userName)
	msg.Data.RoomInfo = room
	event.SetOutputMsg(msg)
}

func startGame(event *Event, gameID string, gameMode int, characterID int, group int) {
	msg := event.GetOutputMsg()
	var gd interface{}
	switch gameID {
	case "5de1f7ddac5b6c1002ece8f1": // FIXME:
		// 1 大盤, 2 小盤
		if gameMode == 1 {
			// mode 1
			gd = domain.CreateChessesStandard()
		} else if gameMode == 2 {
			// mode 2
			gd = domain.CreateChessesHidden()
		} else {
			// mode 3
		}
	case "5f2976433562709c29a6d940":
		users, _ := event.GetRoomUseCase().ChooseCharacter(event.GetRoomID(), event.GetUserID(), characterID)
		users, _ = event.GetRoomUseCase().ChooseGroup(event.GetRoomID(), event.GetUserID(), group)
		gd = ninjafighting.CreateClassicMap(ninjafighting.Small, users)
	}

	room, _ := event.GetRoomUseCase().StartGame(event.GetRoomID(), gd)
	room, _ = event.GetRoomUseCase().SetPlayOrder(event.GetRoomID())
	msg.Data.RoomInfo = room
	event.SetOutputMsg(msg)
}

func leaveRoom(event *Event) {
	msg := event.GetOutputMsg()
	users, _ := event.GetRoomUseCase().LeaveRoom(event.GetRoomID(), event.GetUserID())
	msg.Data.RoomUserList = users
	event.SetOutputMsg(msg)
}

func readyGame(event *Event) {
	msg := event.GetOutputMsg()
	users, _ := event.GetRoomUseCase().ReadyGame(event.GetRoomID(), event.GetUserID())
	msg.Data.RoomUserList = users
	event.SetOutputMsg(msg)
}

func gameOver(event *Event) {
	msg := event.GetOutputMsg()
	room, _ := event.GetRoomUseCase().GameOver(event.GetRoomID())
	msg.Data.RoomInfo = room
	event.SetOutputMsg(msg)
}

func changePassword(event *Event, roomPassword string) {
	msg := event.GetOutputMsg()
	room, _ := event.GetRoomUseCase().ChangeRoomPassword(event.GetRoomID(), roomPassword)
	msg.Data.RoomInfo = room
	event.SetOutputMsg(msg)
}
