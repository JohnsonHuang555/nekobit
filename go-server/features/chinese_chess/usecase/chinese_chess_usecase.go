package usecase

import (
	"go-server/domain"
	chinesechess "go-server/domain/chinese-chess"
	"go-server/utils"
	"math"
)

type chineseChessUseCase struct {
	chineseChessRepo chinesechess.ChineseChessRepository
}

func NewChineseChessUseCase(c chinesechess.ChineseChessRepository) chinesechess.ChineseChessUseCase {
	return &chineseChessUseCase{c}
}

func (cu *chineseChessUseCase) FlipChess(id int, pid string, side chinesechess.ChineseChessSide, playersID []string) ([]*chinesechess.ChineseChess, map[string]chinesechess.ChineseChessSide) {
	chess := cu.chineseChessRepo.FindOne(id)
	chess.IsFliped = true
	cu.chineseChessRepo.UpdateOne(id, chess)

	chesses := cu.chineseChessRepo.FindAll()
	playerSide := cu.chineseChessRepo.UpdatePlayerSide(pid, side, playersID)
	return chesses, playerSide
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
		var chesses []*chinesechess.ChineseChess
		randLocation := utils.RandomShuffle(32)
		for i := 0; i < 32; i++ {
			x := randLocation[i] % 8
			y := math.Floor(float64(randLocation[i] / 8))
			chesses = append(chesses, &chinesechess.ChineseChess{
				ID:        chinesechess.ChineseChessMap[i].ID,
				Side:      chinesechess.ChineseChessMap[i].Side,
				Name:      chinesechess.ChineseChessMap[i].Name,
				IsFliped:  false,
				Rank:      chinesechess.ChineseChessMap[i].Rank,
				Alive:     true,
				LocationX: x,
				LocationY: int(y),
			})
		}
		gameData := &chinesechess.GameData{
			ChineseChess: chesses,
			PlayerSide:   make(map[string]chinesechess.ChineseChessSide),
		}
		return gameData
	}
	return nil
}

func (cu *chineseChessUseCase) CheckGameOver(pid string, playerSides map[string]chinesechess.ChineseChessSide) bool {
	gameOver := true
	var anotherPlayerSide chinesechess.ChineseChessSide
	for key, side := range playerSides {
		if key != pid {
			anotherPlayerSide = side
		}
	}

	chesses := cu.chineseChessRepo.FindAll()
	for _, chess := range chesses {
		if chess.Side == anotherPlayerSide && chess.Alive == true {
			gameOver = false
		}
	}
	return gameOver
}
