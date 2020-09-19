package repository

import (
	"server/domain/hearts"
	"server/utils"
)

type heartsRepository struct {
	gameData *hearts.GameData
}

func NewHeartsRepository(gameData *hearts.GameData) hearts.HeartsRepository {
	return &heartsRepository{gameData}
}

func (hr *heartsRepository) FindAll() []*hearts.Player {
	return hr.gameData.Players
}

func (hr *heartsRepository) FindOne(id string) (*hearts.Player, error) {

}

func (hr *heartsRepository) UpdateHand(id string, hand utils.Poker) error {
}

func (hr *heartsRepository) UpdateScore(id string, score int) error {
}
