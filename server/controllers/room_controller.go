package controllers

import (
	"server/models"
	"server/utils"
)

// RoomService struct
type RoomService struct {
	rooms   []models.Room
	roomNum int
}

// NewRoomService function
func NewRoomService() *RoomService {
	roomService := &RoomService{}
	roomService.roomNum = 0
	return roomService
}

// Room List query
func (r *RoomService) List() []models.Room {
	return r.rooms
}

func (r *RoomService) UserList(id int) []models.User {
	index := r.FindByID(id)
	return r.rooms[index].UserList
}

func (r *RoomService) RoomInfo(roomID int) models.Room {
	index := r.FindByID(roomID)
	return r.rooms[index]
}

// Create Room
func (r *RoomService) Create(room models.Room) int {
	r.roomNum++
	room.ID = r.roomNum
	r.rooms = append(r.rooms, room)
	return r.roomNum
}

// Delete Room
func (r *RoomService) DeleteUser(roomID int, userID string) {
	roomIndex := r.FindByID(roomID)
	userIndex := r.FindUserByID(userID, roomIndex)
	if roomIndex == -1 || userIndex == -1 {
		return
	}

	userList := r.rooms[roomIndex].UserList
	// 代表最後一位玩家則 刪除 該房間
	if len(userList) == 1 {
		r.rooms = append(r.rooms[:roomIndex], r.rooms[roomIndex+1:]...)
	} else {
		userList = append(userList[:userIndex], userList[userIndex+1:]...)
	}
	r.rooms[roomIndex].UserList = userList
}

// 回傳 roomInfo
func (r *RoomService) AddUser(roomID int, user models.User) {
	index := r.FindByID(roomID)
	// 當房間沒有其他玩家時，設定為房主
	if len(r.rooms[index].UserList) == 0 {
		user.IsMaster = true
		user.IsReady = true
	}

	userIndex := r.FindUserByID(user.ID, index)
	// 判斷是否已經在房間內
	if userIndex == -1 {
		r.rooms[index].UserList = append(r.rooms[index].UserList, user)
	}
}

func (r *RoomService) ReadyGame(roomID int, userID string) {
	index := r.FindByID(roomID)
	userIndex := r.FindUserByID(userID, index)
	room := r.rooms[index]
	room.UserList[userIndex].IsReady = !room.UserList[userIndex].IsReady
}

func (r *RoomService) StartGame(roomID int, mode int) ([]models.User, int) {
	index := r.FindByID(roomID)
	r.rooms[index].Status = 1
	switch mode {
	case 1:
		// 大盤
		r.rooms[index].GameData = CreateChessesStandard()
	case 2:
		// 小盤
		r.rooms[index].GameData = CreateChessesHidden()
	}
	return r.rooms[index].UserList, index
}

func (r *RoomService) SetPlayOrder(user []models.User, roomIndex int) {
	randUser := utils.RandomShuffle(len(user))
	for i := 0; i < len(user); i++ {
		r.rooms[roomIndex].UserList[i].PlayOrder = randUser[i]
	}
	playerOne := user[0]
	for i := 0; i < len(user); i++ {
		if user[i].PlayOrder < playerOne.PlayOrder {
			playerOne = user[i]
		}
	}
	r.rooms[roomIndex].NowTurn = playerOne.ID
}

func (r *RoomService) OnFlip(roomID int, userID string, chessID int) {
	roomIndex := r.FindByID(roomID)

	selectedChess := models.ChineseChess{}
	chesses := r.rooms[roomIndex].GameData.([]models.ChineseChess)
	for i := 0; i < len(chesses); i++ {
		if chesses[i].ID == chessID {
			chesses[i].IsFliped = true
			selectedChess = chesses[i]
			break
		}
	}
	r.rooms[roomIndex].GameData = chesses
	r.changePlayer(changePlayer{userID: userID, roomIndex: roomIndex, chessSide: selectedChess.Side})
}

func isSideExist(side string, users []models.User) bool {
	for i := 0; i < len(users); i++ {
		if users[i].Side == side {
			return true
		}
	}
	return false
}

func (r *RoomService) OnEat(userID string, roomID int, chessID int, newLocation int, eatenChessID int) {
	roomIndex := r.FindByID(roomID)
	chesses := r.rooms[roomIndex].GameData.([]models.ChineseChess)
	for i := 0; i < len(chesses); i++ {
		if chesses[i].ID == chessID {
			chesses[i].Location = newLocation
		}
		if chesses[i].ID == eatenChessID {
			chesses[i].Alive = false
			chesses[i].Location = -1
		}
	}
	r.rooms[roomIndex].GameData = chesses
	r.changePlayer(changePlayer{userID: userID, roomIndex: roomIndex})
}

func (r *RoomService) OnMove(userID string, roomID int, chessID int, newLocation int) {
	roomIndex := r.FindByID(roomID)
	chesses := r.rooms[roomIndex].GameData.([]models.ChineseChess)
	for i := 0; i < len(chesses); i++ {
		if chesses[i].ID == chessID {
			chesses[i].Location = newLocation
		}
	}
	r.rooms[roomIndex].GameData = chesses
	r.changePlayer(changePlayer{userID: userID, roomIndex: roomIndex})
}

type changePlayer struct {
	userID    string
	roomIndex int
	chessSide string
}

func (r *RoomService) changePlayer(cp changePlayer) {
	nowPlayerIndex := r.FindUserByID(cp.userID, cp.roomIndex)
	newPlayerOrder := r.rooms[cp.roomIndex].UserList[nowPlayerIndex].PlayOrder + 1
	// 代表 p1 重頭開始
	if newPlayerOrder > len(r.rooms[cp.roomIndex].UserList) {
		newPlayerOrder = 1
	}

	users := r.rooms[cp.roomIndex].UserList
	for i := 0; i < len(users); i++ {
		if cp.chessSide != "" && users[i].Side == "" && users[i].ID == cp.userID {
			if !isSideExist(cp.chessSide, users) {
				users[i].Side = cp.chessSide
			}
		}
		if users[i].PlayOrder == newPlayerOrder {
			r.rooms[cp.roomIndex].NowTurn = users[i].ID
		}
	}
}

func (r *RoomService) FindUserByID(userID string, roomIndex int) int {
	users := r.rooms[roomIndex].UserList
	index := -1
	for i := 0; i < len(users); i++ {
		if users[i].ID == userID {
			index = i
		}
	}
	return index
}

// FindByID , if not found return -1
func (r *RoomService) FindByID(id int) int {
	// for each
	index := -1
	for i := 0; i < len(r.rooms); i++ {
		if r.rooms[i].ID == id {
			// found
			index = i
		}
	}
	return index
}

func (r *RoomService) GameOver(roomID int) {
	roomIndex := r.FindByID(roomID)
	r.rooms[roomIndex].Status = 2
}
