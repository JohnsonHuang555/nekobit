package usecase

import ninjafighting "server/domain/ninja_fighting"

type ninjaFightingUseCase struct {
	ninjaFightingRepo ninjafighting.NinjaFightingRepository
}

func NewNinjaFightingUseCase(n ninjafighting.NinjaFightingRepository) ninjafighting.NinjaFightingUseCase {
	return &ninjaFightingUseCase{n}
}
