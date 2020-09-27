package middleware

import (
	"server/domain"
	"server/domain/hearts"
)

type Event struct {
	roomID              string
	userID              string
	outputMsg           MsgData
	roomUseCase         domain.RoomUseCase
	chineseChessUseCase domain.ChineseChessUseCase
	heartsUseCase       hearts.HeartsUseCase
}

func (e *Event) GetRoomID() string {
	return e.roomID
}

func (e *Event) GetUserID() string {
	return e.userID
}

func (e *Event) GetOutputMsg() MsgData {
	return e.outputMsg
}

func (e *Event) GetRoomUseCase() domain.RoomUseCase {
	return e.roomUseCase
}

func (e *Event) GetChineseChessUseCase() domain.ChineseChessUseCase {
	return e.chineseChessUseCase
}

func (e *Event) GetHeartsUseCase() hearts.HeartsUseCase {
	return e.heartsUseCase
}

func (e *Event) SetRoomID(rid string) {
	e.roomID = rid
}

func (e *Event) SetUserID(uid string) {
	e.userID = uid
}

func (e *Event) SetOutputMsg(msg MsgData) {
	e.outputMsg = msg
}

func (e *Event) SetRoomUseCase(ru domain.RoomUseCase) {
	e.roomUseCase = ru
}

func (e *Event) SetChineseChessUseCase(ccu domain.ChineseChessUseCase) {
	e.chineseChessUseCase = ccu
}

func (e *Event) SetHeartsUseCase(hu hearts.HeartsUseCase) {
	e.heartsUseCase = hu
}
