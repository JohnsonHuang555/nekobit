package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Game schema structure
type Game struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name         string             `json:"name"`
	MaxPlayers   int                `json:"maxPlayers"`
	Rules        []string           `json:"rules"`
	Brief        string             `json:"brief"`
	Description  string             `json:"description"`
	ImgURL       string             `json:"imgURL"`
	EstimateTime int                `json:"estimateTime"`
	CreatedDate  string             `json:"createdDate"`
}
