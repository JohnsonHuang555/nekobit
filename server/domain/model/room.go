package model

// Room schema structure
type Room struct {
	id       int
	password string
	title    string
	mode     int
	status   int
	userList []User
	gameData interface{}
	nowTurn  string
	gameId   string
}

// User schema structure
type User struct {
	id        string
	name      string
	isMaster  bool
	isReady   bool
	playOrder int
	ide       string
}

// NewRoom instance
func NewRoom(
	id int,
	password string,
	title string,
	mode int,
	status int,
	userList []User,
	gameData interface{},
	nowTurn string,
	gameId string,
) *Room {
	return &Room{
		id:       id,
		password: password,
		title:    title,
		mode:     mode,
		status:   status,
		userList: userList,
		gameData: gameData,
		nowTurn:  nowTurn,
		gameId:   gameId,
	}
}
