package middleware

import (
	"server/domain"
	ninjafighting "server/domain/ninja_fighting"
)

type Event struct {
	roomID               string
	userID               string
	outputMsg            MsgData
	roomUseCase          domain.RoomUseCase
	chineseChessUseCase  domain.ChineseChessUseCase
	ninjaFightingUseCase ninjafighting.NinjaFightingUseCase
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

func (e *Event) GetNinjaFightingUseCase() ninjafighting.NinjaFightingUseCase {
	return e.ninjaFightingUseCase
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

func (e *Event) SetNinjaFightingUseCase(nfu ninjafighting.NinjaFightingUseCase) {
	e.ninjaFightingUseCase = nfu
}
