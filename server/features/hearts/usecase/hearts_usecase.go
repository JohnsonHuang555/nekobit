package usecase

import hearts "server/domain/hearts"

type heartsUseCase struct {
	heartsRepo hearts.HeartsRepository
}

func NewHeartsUseCase(h hearts.HeartsRepository) hearts.HeartsUseCase {
	return &heartsUseCase{h}
}
