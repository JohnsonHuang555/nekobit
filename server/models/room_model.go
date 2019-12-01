package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Room schema structure
type Room struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Password      string             `json:"password"`
	Title         string             `json:"title"`
	Mode          int                `json:"mode"`
	GameID        string             `json:"gameID"`
	Status        int                `json:"status"`
	UserList      []User             `json:"userList"`
}

// User schema structure
type User struct {
	ID string `json:"id"`
	Name string `json:"name"`
	IsMaster bool `json:"isMaster"`
	IsReady bool `json:"isReady"`
	PlayOrder int `json:"playOrder"`
}
