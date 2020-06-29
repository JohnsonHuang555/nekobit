package usecase

import (
	"server/domain"
)

type roomUseCase struct {
	roomRepo domain.RoomRepository
}

// NewRoomUseCase will create new an roomUseCase object representation of domain.RoomUseCase interface
func NewRoomUseCase(r domain.RoomRepository) domain.RoomUseCase {
	return &roomUseCase{r}
}

func (ru *roomUseCase) GetRooms() ([]*domain.Room, error) {
	var rooms []*domain.Room
	rooms, err := ru.roomRepo.FindAll(rooms)
	if err != nil {
		return nil, err
	}
	return rooms, nil
}

func (ru *roomUseCase) GetRoomInfo(roomID string) (*domain.Room, error) {
	room, err := ru.roomRepo.FindByID(roomID)
	if err != nil {
		return nil, err
	}
	return room, nil
}

func (ru *roomUseCase) CreateRoom(title string, mode int, password string, gameID string) (string, error) {
	room := &domain.Room{
		Title:    title,
		Mode:     mode,
		Password: password,
		GameID:   gameID,
	}
	id, err := ru.roomRepo.Create(room)
	if err != nil {
		return "", err
	}
	return id, nil
}

func (ru *roomUseCase) JoinRoom(id string, userID string, userName string) (*domain.Room, error) {
	user := &domain.User{
		ID:        userID,
		Name:      userName,
		PlayOrder: 0,
	}

	users, err := ru.roomRepo.AddUser(id, user)
	room, err := ru.roomRepo.FindByID(id)
	room.UserList = users
	if err != nil {
		return nil, err
	}

	return room, nil
}

func (ru *roomUseCase) LeaveRoom(id string, userID string) ([]*domain.User, error) {
	users, err := ru.roomRepo.RemoveUser(id, userID)
	if err != nil {
		return nil, err
	}

	users, err = ru.roomRepo.UpdateUserIsMaster(id, users[0].ID, true)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (ru *roomUseCase) ReadyGame(id string, userID string) ([]*domain.User, error) {
	users, err := ru.roomRepo.UpdateUserIsReady(id, userID)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (ru *roomUseCase) UpdateGameData(roomID string, gameData interface{}) (interface{}, error) {
	gd, err := ru.roomRepo.UpdateGameData(roomID, gameData)
	if err != nil {
		return nil, err
	}
	return gd, nil
}

func (ru *roomUseCase) StartGame(id string, gameData interface{}) (*domain.Room, error) {
	status := 1
	ru.roomRepo.UpdateStatusByID(id, status)
	ru.roomRepo.UpdateGameData(id, gameData)
	room, err := ru.roomRepo.FindByID(id)
	if err != nil {
		return nil, err
	}
	return room, nil
}

func (ru *roomUseCase) SetPlayOrder(id string) (*domain.Room, error) {
	users, err := ru.roomRepo.UpdateUsersPlayOrder(id)
	if err != nil {
		return nil, err
	}
	playerOne := users[0]
	for i := 0; i < len(users); i++ {
		if users[i].PlayOrder < playerOne.PlayOrder {
			playerOne = users[i]
		}
	}
	room, err := ru.roomRepo.UpdateNowTurnByID(id, playerOne.ID)
	if err != nil {
		return nil, err
	}
	return room, nil
}

func (ru *roomUseCase) ChangePlayerTurn(roomID string, nowPlayerID string) (string, error) {
	user, err := ru.roomRepo.FindUserByID(roomID, nowPlayerID)
	room, err := ru.roomRepo.FindByID(roomID)
	if err != nil {
		return "", err
	}

	nowPlayerOrder := user.PlayOrder + 1
	// 代表 p1 重新開始
	if nowPlayerOrder > len(room.UserList)-1 {
		nowPlayerOrder = 0
	}
	newUser, err := ru.roomRepo.FindUserByPlayOrder(roomID, nowPlayerOrder)
	room, err = ru.roomRepo.UpdateNowTurnByID(roomID, newUser.ID)
	if err != nil {
		return "", err
	}
	return room.NowTurn, nil
}

func (ru *roomUseCase) SetPlayerSide(roomID string, userID string, side string) ([]*domain.User, error) {
	users, err := ru.roomRepo.UpdateUserSide(roomID, userID, side)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func (ru *roomUseCase) GameOver(roomID string) (*domain.Room, error) {
	status := 2
	ru.roomRepo.UpdateGameData(roomID, nil)
	room, err := ru.roomRepo.UpdateStatusByID(roomID, status)
	if err != nil {
		return nil, err
	}
	return room, nil
}

func (ru *roomUseCase) ChangeRoomPassword(roomID string, password string) (*domain.Room, error) {
	room, err := ru.roomRepo.UpdatePasswordByID(roomID, password)
	if err != nil {
		return nil, err
	}
	return room, nil
}
