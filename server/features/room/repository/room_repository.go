package repository

import (
	"errors"
	"server/domain"
	"time"

	uuid "github.com/satori/go.uuid"
)

type roomRepository struct {
	rooms      []*domain.Room
	roomNumber int
}

// NewRoomRepository well create an object that represent the room.Repository interface
func NewRoomRepository(rooms []*domain.Room, roomNumber int) domain.RoomRepository {
	return &roomRepository{rooms, roomNumber}
}

func (rr *roomRepository) FindAll(r []*domain.Room) ([]*domain.Room, error) {
	return rr.rooms, nil
}

func (rr *roomRepository) FindByID(id string) (*domain.Room, error) {
	index := rr.findIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}
	return rr.rooms[index], nil
}

func (rr *roomRepository) DeleteByID(id string) error {
	index := rr.findIndexByID(id)
	if index == -1 {
		return errors.New("No room found")
	}

	rr.rooms = append(rr.rooms[:index], rr.rooms[index+1:]...)
	return nil
}

func (rr *roomRepository) UpdateStatusByID(id string, status int) (*domain.Room, error) {
	index := rr.findIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}

	rr.rooms[index].Status = status
	return rr.rooms[index], nil
}

func (rr *roomRepository) UpdatePasswordByID(id string, password string) (*domain.Room, error) {
	index := rr.findIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}

	rr.rooms[index].Password = password
	return rr.rooms[index], nil
}

func (rr *roomRepository) UpdateModeByID(id string, mode int) (*domain.Room, error) {
	index := rr.findIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}

	rr.rooms[index].Mode = mode
	return rr.rooms[index], nil
}

func (rr *roomRepository) UpdateNowTurnByID(id string, nowTurn string) (*domain.Room, error) {
	index := rr.findIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}

	rr.rooms[index].NowTurn = nowTurn
	return rr.rooms[index], nil
}

func (rr *roomRepository) UpdateGameIDByID(id string, gameID string) (*domain.Room, error) {
	index := rr.findIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}

	rr.rooms[index].GameID = gameID
	return rr.rooms[index], nil
}

func (rr *roomRepository) UpdateGameData(roomID string, gameData interface{}) (interface{}, error) {
	index := rr.findIndexByID(roomID)
	if index == -1 {
		return nil, errors.New("No room found")
	}

	rr.rooms[index].GameData = gameData
	return rr.rooms[index].GameData, nil
}

func (rr *roomRepository) Create(room *domain.Room) (string, error) {
	rr.roomNumber++
	room.RoomNumber = rr.roomNumber
	room.ID = uuid.NewV4().String()
	room.Status = 0
	room.CreatedAt = time.Now()
	room.NowTurn = ""
	room.UserList = []*domain.User{}
	rr.rooms = append(rr.rooms, room)
	return room.ID, nil
}

func (rr *roomRepository) AddUser(roomID string, u *domain.User) ([]*domain.User, error) {
	index := rr.findIndexByID(roomID)
	if len(rr.rooms[index].UserList) == 0 {
		u.IsMaster = true
		u.IsReady = true
	}

	userIndex := rr.findUserByID(u.ID, index)
	// 判斷是否已經在房間內
	if userIndex == -1 {
		// 不在則新增
		rr.rooms[index].UserList = append(rr.rooms[index].UserList, u)
	}
	return rr.rooms[index].UserList, nil
}

func (rr *roomRepository) RemoveUser(roomID string, userID string) ([]*domain.User, error) {
	roomIndex := rr.findIndexByID(roomID)
	userIndex := rr.findUserByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	userList := rr.rooms[roomIndex].UserList
	// 代表最後一位玩家則 刪除 該房間
	if len(userList) == 1 {
		rr.rooms = append(rr.rooms[:roomIndex], rr.rooms[roomIndex+1:]...)
	} else {
		userList = append(userList[:userIndex], userList[userIndex+1:]...)
	}
	rr.rooms[roomIndex].UserList = userList
	return rr.rooms[roomIndex].UserList, nil
}

func (rr *roomRepository) UpdateUserIsReady(roomID string, userID string) ([]*domain.User, error) {
	roomIndex := rr.findIndexByID(roomID)
	userIndex := rr.findUserByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	userList := rr.rooms[roomIndex].UserList
	userList[userIndex].IsReady = !userList[userIndex].IsReady

	return rr.rooms[roomIndex].UserList, nil
}

func (rr *roomRepository) UpdateUserIsMaster(roomID string, userID string, isMaster bool) ([]*domain.User, error) {
	roomIndex := rr.findIndexByID(roomID)
	userIndex := rr.findUserByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	// ID, Name 不覆寫, 保護成員
	userList := rr.rooms[roomIndex].UserList
	userList[userIndex].IsMaster = isMaster

	return rr.rooms[roomIndex].UserList, nil
}

func (rr *roomRepository) UpdateUserPlayOrder(roomID string, userID string, playOrder int) ([]*domain.User, error) {
	roomIndex := rr.findIndexByID(roomID)
	userIndex := rr.findUserByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	// ID, Name 不覆寫, 保護成員
	userList := rr.rooms[roomIndex].UserList
	userList[userIndex].PlayOrder = playOrder

	return rr.rooms[roomIndex].UserList, nil
}

func (rr *roomRepository) UpdateUserSide(roomID string, userID string, side string) ([]*domain.User, error) {
	roomIndex := rr.findIndexByID(roomID)
	userIndex := rr.findUserByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	// ID, Name 不覆寫, 保護成員
	userList := rr.rooms[roomIndex].UserList
	userList[userIndex].Side = side

	return rr.rooms[roomIndex].UserList, nil
}

func (rr *roomRepository) findIndexByID(id string) int {
	// for each
	index := -1
	for i := 0; i < len(rr.rooms); i++ {
		if rr.rooms[i].ID == id {
			// found
			index = i
		}
	}
	return index
}

func (rr *roomRepository) findUserByID(userID string, roomIndex int) int {
	users := rr.rooms[roomIndex].UserList
	index := -1
	for i := 0; i < len(users); i++ {
		if users[i].ID == userID {
			index = i
		}
	}
	return index
}
