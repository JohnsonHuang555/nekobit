package middleware

import "server/domain"

func flipChess(event *Event, chessID int) {
	msg := event.GetOutputMsg()
	gd, side, _ := event.GetChineseChessUseCase().FlipChess(chessID)
	gameData, _ := event.GetRoomUseCase().UpdateGameData(event.GetRoomID(), gd)
	nowPlayer, _ := event.GetRoomUseCase().ChangePlayerTurn(event.GetRoomID(), event.GetUserID())
	users, _ := event.GetRoomUseCase().SetPlayerSideIndependence(event.GetRoomID(), event.GetUserID(), side, domain.TwoSides)
	msg.Data.RoomUserList = users
	msg.Data.GameData = gameData
	msg.Data.NowTurn = nowPlayer
	event.SetOutputMsg(msg)
}

func moveChess(event *Event, chessID int, locationX int, locationY int) {
	msg := event.GetOutputMsg()
	gd, _ := event.GetChineseChessUseCase().MoveChess(chessID, locationX, locationY)
	gameData, _ := event.GetRoomUseCase().UpdateGameData(event.GetRoomID(), gd)
	nowPlayer, _ := event.GetRoomUseCase().ChangePlayerTurn(event.GetRoomID(), event.GetUserID())
	msg.Data.GameData = gameData
	msg.Data.NowTurn = nowPlayer
	event.SetOutputMsg(msg)
}

func eatChess(event *Event, chessID int, targetID int) {
	msg := event.GetOutputMsg()
	gd, _ := event.GetChineseChessUseCase().EatChess(chessID, targetID)
	gameData, _ := event.GetRoomUseCase().UpdateGameData(event.GetRoomID(), gd)
	nowPlayer, _ := event.GetRoomUseCase().ChangePlayerTurn(event.GetRoomID(), event.GetUserID())
	msg.Data.GameData = gameData
	msg.Data.NowTurn = nowPlayer
	event.SetOutputMsg(msg)
}

func setPlayerSideStandard(event *Event) {
	msg := event.GetOutputMsg()
	users, _ := event.GetRoomUseCase().SetPlayerSideIndependence(event.GetRoomID(), event.GetUserID(), "BLACK", domain.TwoSides)
	msg.Data.RoomUserList = users
	event.SetOutputMsg(msg)
}
