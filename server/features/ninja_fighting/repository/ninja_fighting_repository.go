package repository

import ninjafighting "server/domain/ninja_fighting"

type ninjaFightingRepository struct {
	gameData *ninjafighting.GameData
}

func NewNinjaFightingRepository(gameData *ninjafighting.GameData) ninjafighting.NinjaFightingRepository {
	return &ninjaFightingRepository{gameData}
}
