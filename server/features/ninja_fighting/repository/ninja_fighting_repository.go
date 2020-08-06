package repository

import ninjafighting "server/domain/ninja_fighting"

type ninjaFightingRepository struct {
	mapItems []*ninjafighting.MapItem
}

func NewNinjaFightingRepository(mapItems []*ninjafighting.MapItem) ninjafighting.NinjaFightingRepository {
	return &ninjaFightingRepository{mapItems}
}
