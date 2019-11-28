package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Room schema structure
type Room struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Password      string             `json:"password"`
	Title         string             `json:"title"`
	Mode          int                `json:"mode"`
	CurrentPlayer int                `json:"currentPlayer"`
	GameID        string             `json:"gameID"`
	Status        int                `json:"status"`
}
