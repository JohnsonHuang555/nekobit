package usecase

import (
	"go-server/domain"
	chinesechess "go-server/domain/chinese-chess"
)

type chineseChessUseCase struct {
	chineseChessRepo chinesechess.ChineseChessRepository
}

func NewChineseChessUseCase(c chinesechess.ChineseChessRepository) chinesechess.ChineseChessUseCase {
	return &chineseChessUseCase{c}
}

func (cu *chineseChessUseCase) FlipChess(id int) []*chinesechess.ChineseChess {
	chess := cu.chineseChessRepo.FindOne(id)
	chess.IsFliped = true
	cu.chineseChessRepo.UpdateOne(id, chess)

	chesses := cu.chineseChessRepo.FindAll()
	return chesses
}

func (cu *chineseChessUseCase) EatChess(id int, targetID int) []*chinesechess.ChineseChess {
	chess := cu.chineseChessRepo.FindOne(id)
	targetChess := cu.chineseChessRepo.FindOne(targetID)

	targetChess.Alive = false
	cu.chineseChessRepo.UpdateOne(targetID, targetChess)

	chess.LocationX = targetChess.LocationX
	chess.LocationY = targetChess.LocationY
	cu.chineseChessRepo.UpdateOne(id, chess)

	chesses := cu.chineseChessRepo.FindAll()
	return chesses
}

func (cu *chineseChessUseCase) MoveChess(id int, locationX int, locationY int) []*chinesechess.ChineseChess {
	chess := cu.chineseChessRepo.FindOne(id)
	chess.LocationX = locationX
	chess.LocationY = locationY
	cu.chineseChessRepo.UpdateOne(id, chess)

	chesses := cu.chineseChessRepo.FindAll()
	return chesses
}

func (cu *chineseChessUseCase) CreateGame(gameMode domain.GameMode) *chinesechess.GameData {
	switch gameMode {
	case chinesechess.Standard:
	case chinesechess.Hidden:
		gameData := &chinesechess.GameData{
			ChineseChess: cu.chineseChessRepo.FindAll(),
		}
		return gameData
	}
	return nil
}
