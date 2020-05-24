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

func (ru *roomUseCase) StartGame(id string) (*domain.Room, error) {
	// FIXME: setPlayOrder
	status := 1
	room, err := ru.roomRepo.UpdateStatusByID(id, status)
	if err != nil {
		return nil, err
	}
	return room, nil
}
