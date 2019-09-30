package gameModel

import "go.mongodb.org/mongo-driver/bson/primitive"

// Game schema structure
type Game struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name         string             `json:"name,omitempty"`
	MaxPlayers   int                `json:"maxPlayer,omitempty"`
	Rules        []string           `json:"rules,omitempty"`
	Brief        string             `json:"brief,omitempty"`
	Description  string             `json:"description,omitempty"`
	ImgUrl       string             `json:"imgUrl,omitempty"`
	EstimateTime int                `json:"estimateTime,omitempty"`
	CreatedDate  string             `json:"createdDate,omitempty"`
}
