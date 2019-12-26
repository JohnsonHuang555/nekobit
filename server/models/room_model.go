package models

// Room schema structure
type Room struct {
	ID       int         `json:"id,omitempty"`
	Password string      `json:"password"`
	Title    string      `json:"title"`
	Mode     int         `json:"mode"`
	Status   int         `json:"status"`
	UserList []User      `json:"userList"`
	GameData interface{} `json:"gameData"`
	NowTurn  string      `json:"nowTurn"`
	GameName string      `json:"gameName"`
}

// User schema structure
type User struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	IsMaster  bool   `json:"isMaster"`
	IsReady   bool   `json:"isReady"`
	PlayOrder int    `json:"playOrder"`
	Side      string `json:"side"`
}

// NewRoom instance
func NewRoom(id int, password string, title string, mode int,
	status int, userList []User, gameData interface{}, nowTurn string, gameName string) Room {
	return Room{
		ID:       id,
		Password: password,
		Title:    title,
		Mode:     mode,
		Status:   status,
		UserList: userList,
		GameData: gameData,
		NowTurn:  nowTurn,
		GameName: gameName,
	}
}

// NewRoom withoutID instance
func NewRoomWithoutID(password string, title string, mode int,
	status int, userList []User, gameData interface{}, nowTurn string, gameName string) Room {
	return Room{
		Password: password,
		Title:    title,
		Mode:     mode,
		Status:   status,
		UserList: userList,
		GameData: gameData,
		NowTurn:  nowTurn,
		GameName: gameName,
	}
}
