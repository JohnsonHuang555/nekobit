package domain

import (
	"context"
	"time"
)

// Game schema structure
type Game struct {
	ID           int64     `json:"id"`
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

// GameUseCase represent the game's useacses
type GameUseCase interface {
	GetGames() ([]*Game, error)
	GetGameInfo(id string) (*Game, error)
}

// GameRepository represent the game's repository contract
type GameRepository interface {
	FindAll(ctx context.Context, cursor string, num int64) (res []Game, nextCursor string, err error)
	FindOneByID(ctx context.Context, id int64) (res Game, err error)
}
