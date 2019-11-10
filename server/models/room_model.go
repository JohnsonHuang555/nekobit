package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type user struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	IsMaster  bool   `json:"isMaster"`
	IsReady   bool   `json:"isReady"`
	PlayOrder int    `json:"playOrder"`
}

// Room schema structure
type Room struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserList      []user             `json:"userList"`
	Title         string             `json:"title"`
	Password      string             `json:"password"`
	Mode          int                `json:"mode"`
	IsLock        bool               `json:"isLock"`
	CurrentPlayer int                `json:"currentPlayer"`
	MaxPlayers    int                `json:"maxPlayers"`
	CreatedDate   string             `json:"createdDate"`
	NowTurn       int                `json:"nowTurn"`
	GameStatus    int                `json:"gameStatus"`
	GameName      string             `json:"gameName"`
}
