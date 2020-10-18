package domain

import (
	"time"
)

// Game schema structure
type Game struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	MinPlayers   int       `json:"min_players"`
	MaxPlayers   int       `json:"max_players"`
	Brief        string    `json:"brief"`
	Description  string    `json:"description"`
	ImgURL       string    `json:"img_url"`
	EstimateTime int       `json:"estimate_time"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

// GameRepository represent the game's repository contract
type GameRepository interface {
	FindAll() ([]*Game, error)
	FindOneByID(id string) (*Game, error)
}

// GameUseCase represent the game's useacses
type GameUseCase interface {
	GetGames() ([]*Game, error)
	GetGameInfo(id string) (*Game, error)
}
