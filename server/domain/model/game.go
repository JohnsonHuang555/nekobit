package model

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Game schema structure
type Game struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name         string             `json:"name"`
	MaxPlayers   int                `json:"max_players"`
	Rules        []string           `json:"rules"`
	Brief        string             `json:"brief"`
	Description  string             `json:"description"`
	ImgURL       string             `json:"img_url"`
	EstimateTime int                `json:"estimate_time"`
	CreatedAt    time.Time          `json:"created_at"`
	UpdatedAt    time.Time          `json:"updated_at"`
	DeletedAt    time.Time          `json:"deleted_at"`
}
