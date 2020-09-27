package repository

import (
	"errors"
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
	playerIndex := hr.findPlayerIndexByID(id)
	if playerIndex == -1 {
		return nil, errors.New("Player not found")
	}
	return hr.gameData.Players[playerIndex], nil
}

func (hr *heartsRepository) UpdateHand(id string, hand []*utils.Poker) error {
	playerIndex := hr.findPlayerIndexByID(id)
	if playerIndex == -1 {
		return errors.New("Player not found")
	}
	hr.gameData.Players[playerIndex].Hand = hand
	return nil
}

func (hr *heartsRepository) UpdateScore(id string, score int) error {
	playerIndex := hr.findPlayerIndexByID(id)
	if playerIndex == -1 {
		return errors.New("Player not found")
	}
	hr.gameData.Players[playerIndex].Score = score
	return nil
}

func (hr *heartsRepository) findPlayerIndexByID(id string) int {
	index := -1
	for i := 0; i < len(hr.gameData.Players); i++ {
		if hr.gameData.Players[i].UserID == id {
			index = i
		}
	}
	return index
}
