package model

import "time"

// Game schema structure
type Game struct {
	ID           string    `json:"id,omitempty"`
	Name         string    `json:"name"`
	MaxPlayers   int       `json:"max_players"`
	Rules        []string  `json:"rules"`
	Brief        string    `json:"brief"`
	Description  string    `json:"description"`
	ImgURL       string    `json:"img_url"`
	EstimateTime int       `json:"estimate_time"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	DeletedAt    time.Time `json:"deleted_at"`
}
