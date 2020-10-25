package usecase

import (
	"go-server/domain"
)

type roomUseCase struct {
	roomRepo domain.RoomRepository
}

func NewRoomUseCase(r domain.RoomRepository) domain.RoomUseCase {
	return &roomUseCase{r}
}

func (ru *roomUseCase) GetRooms() []*domain.Room {
	rooms := ru.roomRepo.FindAll()
	return rooms
}

func (ru *roomUseCase) GetRoomInfo(rid string) (*domain.Room, error) {
	room, err := ru.roomRepo.FindByID(rid)
	if err != nil {
		return nil, err
	}

	return room, nil
}

func (ru *roomUseCase) JoinRoom(rid string, uid string, playerName string) (*domain.Room, error) {
	player := &domain.Player{
		ID:        uid,
		Name:      playerName,
		PlayOrder: 0,
	}

	// 判斷是否已經在房間內
	existPlayer, _ := ru.roomRepo.FindPlayerByID(rid, uid)

	// 不存在使用者 則 create
	if existPlayer == nil {
		err := ru.roomRepo.CreatePlayer(rid, player)
		if err != nil {
			return nil, err
		}
	}

	room, err := ru.roomRepo.FindByID(rid)
	if err != nil {
		return nil, err
	}
	return room, nil
}

func (ru *roomUseCase) LeaveRoom(rid string, uid string) ([]*domain.Player, error) {
	roomPlayers := ru.roomRepo.FindAllPlayers(rid)
	// 最後一位使用者 則 刪除房間
	if len(roomPlayers) == 1 {
		err := ru.roomRepo.DeleteByID(rid)
		if err != nil {
			return nil, err
		}
		return nil, err
	}

	err := ru.roomRepo.DeletePlayerByID(rid, uid)
	if err != nil {
		return nil, err
	}

	newPlayers := ru.roomRepo.FindAllPlayers(rid)
	return newPlayers, nil
}

func (ru *roomUseCase) ReadyGame(rid string, uid string) ([]*domain.Player, error) {
	player, err := ru.roomRepo.FindPlayerByID(rid, uid)
	if err != nil {
		return nil, err
	}

	player.IsReady = !player.IsReady
	err = ru.roomRepo.UpdatePlayerByID(rid, uid, player)
	if err != nil {
		return nil, err
	}

	newPlayers := ru.roomRepo.FindAllPlayers(rid)
	return newPlayers, nil
}

func (ru *roomUseCase) StartGame(rid string, gameData interface{}) (*domain.Room, error) {
	room, err := ru.roomRepo.FindByID(rid)
	if err != nil {
		return nil, err
	}

	room.Status = domain.Playing
	room.GameData = gameData
	err = ru.roomRepo.UpdateByID(rid, room)
	if err != nil {
		return nil, err
	}

	return room, nil
}

func (ru *roomUseCase) CreateRoom(title string, mode int, password string, gamePack domain.GamePack) (string, error) {
	room := &domain.Room{
		Title:    title,
		Mode:     mode,
		Password: password,
		GamePack: gamePack,
	}

	id, err := ru.roomRepo.Create(room)
	if err != nil {
		return "", err
	}

	return id, nil
}
