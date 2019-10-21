package gameModel

import "go.mongodb.org/mongo-driver/bson/primitive"

// Game schema structure
type Game struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name         string
	MaxPlayers   int
	Rules        []string
	Brief        string
	Description  string
	ImgUrl       string
	EstimateTime int
	CreatedDate  string
}
