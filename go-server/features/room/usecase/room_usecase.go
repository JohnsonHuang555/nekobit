package usecase

import (
	"go-server/domain"
	"go-server/utils"
)

type roomUseCase struct {
	roomRepo domain.RoomRepository
}

func NewRoomUseCase(r domain.RoomRepository) domain.RoomUseCase {
	return &roomUseCase{r}
}

func (ru *roomUseCase) GetRooms(gamePack string) []*domain.Room {
	rooms := ru.roomRepo.FindAllByGID(gamePack)
	return rooms
}

func (ru *roomUseCase) GetRoomInfo(rid string) (*domain.Room, error) {
	room, err := ru.roomRepo.FindByID(rid)
	if err != nil {
		return nil, err
	}

	return room, nil
}

// FIXME:playerName string
func (ru *roomUseCase) JoinRoom(rid string, pid string, playerName string) (*domain.Room, error) {
	player := &domain.Player{
		ID:        pid,
		Name:      playerName,
		PlayOrder: 0,
	}

	// 判斷是否已經在房間內
	existPlayer, _ := ru.roomRepo.FindPlayerByID(rid, pid)

	// 不存在使用者 則 create
	if existPlayer == nil {
		if len(ru.roomRepo.FindAllPlayers(rid)) == 0 {
			player.IsMaster = true
			player.IsReady = true
		}
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

func (ru *roomUseCase) LeaveRoom(rid string, pid string) ([]*domain.Player, error) {
	roomPlayers := ru.roomRepo.FindAllPlayers(rid)
	// 最後一位使用者 則 刪除房間
	if len(roomPlayers) == 1 {
		err := ru.roomRepo.DeleteByID(rid)
		if err != nil {
			return nil, err
		}
		return nil, err
	}

	err := ru.roomRepo.DeletePlayerByID(rid, pid)
	if err != nil {
		return nil, err
	}

	newPlayers := ru.roomRepo.FindAllPlayers(rid)
	return newPlayers, nil
}

func (ru *roomUseCase) ReadyGame(rid string, pid string) ([]*domain.Player, error) {
	player, err := ru.roomRepo.FindPlayerByID(rid, pid)
	if err != nil {
		return nil, err
	}

	player.IsReady = !player.IsReady
	err = ru.roomRepo.UpdatePlayerByID(rid, pid, player)
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

	// 決定玩家順序
	randOrders := utils.RandomShuffle(len(room.Players))
	for i := 0; i < len(room.Players); i++ {
		room.Players[i].PlayOrder = randOrders[i]
		// 代表起始玩家
		if randOrders[i] == 0 {
			room.NowTurn = room.Players[i].ID
		}
	}

	err = ru.roomRepo.UpdateByID(rid, room)
	if err != nil {
		return nil, err
	}

	return room, nil
}

func (ru *roomUseCase) CreateRoom(title string, gameMode domain.GameMode, password string, gamePack domain.GamePack) (string, error) {
	room := &domain.Room{
		Title:    title,
		GameMode: gameMode,
		Password: password,
		GamePack: gamePack,
	}

	id, err := ru.roomRepo.Create(room)
	if err != nil {
		return "", err
	}

	return id, nil
}

func (ru *roomUseCase) UpdateGameData(rid string, gameData interface{}) error {
	room, err := ru.roomRepo.FindByID(rid)
	if err != nil {
		return err
	}

	room.GameData = gameData
	err = ru.roomRepo.UpdateByID(rid, room)
	if err != nil {
		return err
	}

	return nil
}

func (ru *roomUseCase) ChangePlayerTurn(rid string, pid string) (string, error) {
	room, err := ru.roomRepo.FindByID(rid)
	if err != nil {
		return "", err
	}

	player, err := ru.roomRepo.FindPlayerByID(rid, pid)
	if err != nil {
		return "", err
	}

	nowPlayerOrder := player.PlayOrder + 1
	// 代表 p1 重新開始
	if nowPlayerOrder > len(room.Players)-1 {
		nowPlayerOrder = 0
	}

	newPlayer, err := ru.roomRepo.FindPlayerByPlayerOrder(rid, nowPlayerOrder)
	if err != nil {
		return "", err
	}

	room.NowTurn = newPlayer.ID
	err = ru.roomRepo.UpdateByID(rid, room)
	if err != nil {
		return "", err
	}

	return room.NowTurn, nil
}

func (ru *roomUseCase) GameOver(rid string) error {
	room, err := ru.roomRepo.FindByID(rid)
	if err != nil {
		return err
	}

	room.Status = domain.Preparing

	err = ru.roomRepo.UpdateByID(rid, room)
	if err != nil {
		return err
	}

	return nil
}
