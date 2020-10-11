package repository

import (
	"errors"
	"server/domain"
	"server/utils"
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
	index := rr.findRoomIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}
	return rr.rooms[index], nil
}

func (rr *roomRepository) DeleteByID(id string) error {
	index := rr.findRoomIndexByID(id)
	if index == -1 {
		return errors.New("No room found")
	}

	rr.rooms = append(rr.rooms[:index], rr.rooms[index+1:]...)
	return nil
}

func (rr *roomRepository) UpdateStatusByID(id string, status int) (*domain.Room, error) {
	index := rr.findRoomIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}

	rr.rooms[index].Status = status
	return rr.rooms[index], nil
}

func (rr *roomRepository) UpdatePasswordByID(id string, password string) (*domain.Room, error) {
	index := rr.findRoomIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}

	rr.rooms[index].Password = password
	return rr.rooms[index], nil
}

func (rr *roomRepository) UpdateModeByID(id string, mode int) (*domain.Room, error) {
	index := rr.findRoomIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}

	rr.rooms[index].Mode = mode
	return rr.rooms[index], nil
}

func (rr *roomRepository) UpdateNowTurnByID(id string, nowTurn string) (*domain.Room, error) {
	index := rr.findRoomIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}

	rr.rooms[index].NowTurn = nowTurn
	return rr.rooms[index], nil
}

func (rr *roomRepository) UpdateGameIDByID(id string, gameID string) (*domain.Room, error) {
	index := rr.findRoomIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}

	rr.rooms[index].GameID = gameID
	return rr.rooms[index], nil
}

func (rr *roomRepository) UpdateGameData(roomID string, gameData interface{}) (interface{}, error) {
	index := rr.findRoomIndexByID(roomID)
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
	room.UserList = []*domain.Player{}
	rr.rooms = append(rr.rooms, room)
	return room.ID, nil
}

func (rr *roomRepository) AddUser(roomID string, u *domain.Player) ([]*domain.Player, error) {
	index := rr.findRoomIndexByID(roomID)
	if len(rr.rooms[index].UserList) == 0 {
		u.IsMaster = true
		u.IsReady = true
	}

	userIndex := rr.findUserIndexByID(u.ID, index)
	// 判斷是否已經在房間內
	if userIndex == -1 {
		// 不在則新增
		rr.rooms[index].UserList = append(rr.rooms[index].UserList, u)
	}
	return rr.rooms[index].UserList, nil
}

func (rr *roomRepository) RemoveUser(roomID string, userID string) ([]*domain.Player, error) {
	roomIndex := rr.findRoomIndexByID(roomID)
	userIndex := rr.findUserIndexByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	userList := rr.rooms[roomIndex].UserList
	// 代表最後一位玩家則 刪除 該房間
	if len(userList) == 1 {
		rr.rooms = append(rr.rooms[:roomIndex], rr.rooms[roomIndex+1:]...)
		return nil, nil
	} else {
		userList = append(userList[:userIndex], userList[userIndex+1:]...)
		rr.rooms[roomIndex].UserList = userList
		return rr.rooms[roomIndex].UserList, nil
	}
}

func (rr *roomRepository) UpdateUserIsReady(roomID string, userID string) ([]*domain.Player, error) {
	roomIndex := rr.findRoomIndexByID(roomID)
	userIndex := rr.findUserIndexByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	userList := rr.rooms[roomIndex].UserList
	userList[userIndex].IsReady = !userList[userIndex].IsReady

	return rr.rooms[roomIndex].UserList, nil
}

func (rr *roomRepository) UpdateUserIsMaster(roomID string, userID string, isMaster bool) ([]*domain.Player, error) {
	roomIndex := rr.findRoomIndexByID(roomID)
	userIndex := rr.findUserIndexByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	// ID, Name 不覆寫, 保護成員
	userList := rr.rooms[roomIndex].UserList
	userList[userIndex].IsMaster = isMaster

	return rr.rooms[roomIndex].UserList, nil
}

func (rr *roomRepository) UpdateUsersPlayOrder(roomID string) ([]*domain.Player, error) {
	roomIndex := rr.findRoomIndexByID(roomID)
	if roomIndex == -1 {
		return nil, errors.New("Room not exist")
	}

	nowUsers := rr.rooms[roomIndex].UserList
	// random update
	randUser := utils.RandomShuffle(len(nowUsers))
	for i := 0; i < len(nowUsers); i++ {
		nowUsers[i].PlayOrder = randUser[i]
	}

	return rr.rooms[roomIndex].UserList, nil
}

func (rr *roomRepository) UpdateUserCharacterID(roomID string, userID string, characterID int) ([]*domain.Player, error) {
	roomIndex := rr.findRoomIndexByID(roomID)
	userIndex := rr.findUserIndexByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	rr.rooms[roomIndex].UserList[userIndex].CharacterID = characterID
	return rr.rooms[roomIndex].UserList, nil
}

func (rr *roomRepository) UpdateUserGroup(roomID string, userID string, group int) ([]*domain.Player, error) {
	roomIndex := rr.findRoomIndexByID(roomID)
	userIndex := rr.findUserIndexByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	rr.rooms[roomIndex].UserList[userIndex].Group = group
	return rr.rooms[roomIndex].UserList, nil
}

func (rr *roomRepository) FindUserByID(roomID string, userID string) (*domain.Player, error) {
	roomIndex := rr.findRoomIndexByID(roomID)
	userIndex := rr.findUserIndexByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	return rr.rooms[roomIndex].UserList[userIndex], nil
}

func (rr *roomRepository) FindUserByPlayOrder(roomID string, playOrder int) (*domain.Player, error) {
	roomIndex := rr.findRoomIndexByID(roomID)
	users := rr.rooms[roomIndex].UserList
	userIndex := -1
	for i := 0; i < len(users); i++ {
		if users[i].PlayOrder == playOrder {
			userIndex = i
		}
	}
	if roomIndex == -1 || userIndex == -1 {
		return nil, errors.New("User not exist")
	}

	return rr.rooms[roomIndex].UserList[userIndex], nil
}

// private methods
func (rr *roomRepository) findRoomIndexByID(id string) int {
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

func (rr *roomRepository) findUserIndexByID(userID string, roomIndex int) int {
	users := rr.rooms[roomIndex].UserList
	index := -1
	for i := 0; i < len(users); i++ {
		if users[i].ID == userID {
			index = i
		}
	}
	return index
}
