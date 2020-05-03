package usecase

import (
	"fmt"
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
	var room *domain.Room
	room.Title = title
	room.Mode = mode
	room.Password = password
	room.GameID = gameID
	fmt.Println(room, "rooooom")
	id, err := ru.roomRepo.Create(room)
	if err != nil {
		return "", err
	}
	return id, nil
}

func (ru *roomUseCase) JoinRoom(id string, userID string, userName string) ([]*domain.User, error) {
	var user *domain.User
	user.ID = userID
	user.Name = userName
	user.PlayOrder = 0

	users, err := ru.roomRepo.AddUser(id, user)
	if err != nil {
		return nil, err
	}

	return users, nil
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

func (ru *roomUseCase) StartGame(id string) (*domain.Room, error) {
	// FIXME: setPlayOrder
	status := 1
	room, err := ru.roomRepo.UpdateStatusByID(id, status)
	if err != nil {
		return nil, err
	}
	return room, nil
}
