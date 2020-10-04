package usecase

import (
	"context"
	"server/domain"
	"time"
)

type gameUseCase struct {
	gameRepo       domain.GameRepository
	contextTimeout time.Duration
}

// NewGameUseCase will create new an gameUseCase object representation of domain.GameUseCase interface
func NewGameUseCase(g domain.GameRepository, timeout time.Duration) domain.GameUseCase {
	return &gameUseCase{g, timeout}
}

func (gu *gameUseCase) GetGames(c context.Context, cursor string, num int64) (res []domain.Game, nextCursor string, err error) {
	if num == 0 {
		num = 10
	}

	ctx, cancel := context.WithTimeout(c, gu.contextTimeout)
	defer cancel()

	res, nextCursor, err = gu.gameRepo.FindAll(ctx, cursor, num)
	if err != nil {
		return nil, "", err
	}

	return
}

func (gu *gameUseCase) GetGameInfo(c context.Context, id int64) (res domain.Game, err error) {
	ctx, cancel := context.WithTimeout(c, gu.contextTimeout)
	defer cancel()

	res, err = gu.gameRepo.FindOneByID(ctx, id)
	if err != nil {
		return
	}
	return
}
