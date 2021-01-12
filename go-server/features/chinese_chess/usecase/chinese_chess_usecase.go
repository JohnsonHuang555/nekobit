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
	var chesses []*chinesechess.ChineseChess
	switch gameMode {
	case chinesechess.Standard:
		chesses = []*chinesechess.ChineseChess{
			{
				ID:        1,
				Side:      "BLACK",
				Name:      "將",
				LocationX: 4,
				LocationY: 0,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        2,
				Side:      "BLACK",
				Name:      "士",
				LocationX: 3,
				LocationY: 0,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        3,
				Side:      "BLACK",
				Name:      "士",
				LocationX: 5,
				LocationY: 0,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        4,
				Side:      "BLACK",
				Name:      "象",
				LocationX: 2,
				LocationY: 0,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        5,
				Side:      "BLACK",
				Name:      "象",
				LocationX: 6,
				LocationY: 0,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        6,
				Side:      "BLACK",
				Name:      "車",
				LocationX: 0,
				LocationY: 0,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        7,
				Side:      "BLACK",
				Name:      "車",
				LocationX: 8,
				LocationY: 0,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        8,
				Side:      "BLACK",
				Name:      "馬",
				LocationX: 1,
				LocationY: 0,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        9,
				Side:      "BLACK",
				Name:      "馬",
				LocationX: 7,
				LocationY: 0,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        10,
				Side:      "BLACK",
				Name:      "卒",
				LocationX: 0,
				LocationY: 3,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        11,
				Side:      "BLACK",
				Name:      "卒",
				LocationX: 2,
				LocationY: 3,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        12,
				Side:      "BLACK",
				Name:      "卒",
				LocationX: 4,
				LocationY: 3,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        13,
				Side:      "BLACK",
				Name:      "卒",
				LocationX: 6,
				LocationY: 3,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        14,
				Side:      "BLACK",
				Name:      "卒",
				LocationX: 8,
				LocationY: 3,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        15,
				Side:      "BLACK",
				Name:      "包",
				LocationX: 1,
				LocationY: 2,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        16,
				Side:      "BLACK",
				Name:      "包",
				LocationX: 7,
				LocationY: 2,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        17,
				Side:      "RED",
				Name:      "帥",
				LocationX: 4,
				LocationY: 9,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        18,
				Side:      "RED",
				Name:      "仕",
				LocationX: 3,
				LocationY: 9,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        19,
				Side:      "RED",
				Name:      "仕",
				LocationX: 5,
				LocationY: 9,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        20,
				Side:      "RED",
				Name:      "相",
				LocationX: 2,
				LocationY: 9,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        21,
				Side:      "RED",
				Name:      "相",
				LocationX: 6,
				LocationY: 9,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        22,
				Side:      "RED",
				Name:      "俥",
				LocationX: 0,
				LocationY: 9,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        23,
				Side:      "RED",
				Name:      "俥",
				LocationX: 8,
				LocationY: 9,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        24,
				Side:      "RED",
				Name:      "傌",
				LocationX: 1,
				LocationY: 9,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        25,
				Side:      "RED",
				Name:      "傌",
				LocationX: 7,
				LocationY: 9,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        26,
				Side:      "RED",
				Name:      "兵",
				LocationX: 0,
				LocationY: 6,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        27,
				Side:      "RED",
				Name:      "兵",
				LocationX: 2,
				LocationY: 6,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        28,
				Side:      "RED",
				Name:      "兵",
				LocationX: 4,
				LocationY: 6,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        29,
				Side:      "RED",
				Name:      "兵",
				LocationX: 6,
				LocationY: 6,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        30,
				Side:      "RED",
				Name:      "兵",
				LocationX: 8,
				LocationY: 6,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        31,
				Side:      "RED",
				Name:      "炮",
				LocationX: 1,
				LocationY: 7,
				IsFliped:  true,
				Alive:     true,
			},
			{
				ID:        32,
				Side:      "RED",
				Name:      "炮",
				LocationX: 7,
				LocationY: 7,
				IsFliped:  true,
				Alive:     true,
			},
		}
	case chinesechess.Hidden:
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
	}
	gameData := &chinesechess.GameData{
		ChineseChess: chesses,
		PlayerSide:   make(map[string]chinesechess.ChineseChessSide),
	}
	return gameData
}

func (cu *chineseChessUseCase) CheckGameOver(pid string, playerSides map[string]chinesechess.ChineseChessSide, gameMode domain.GameMode) bool {
	gameOver := true
	switch gameMode {
	case chinesechess.Standard:
		// TODO: 每下一步棋檢查是否將軍
		gameOver = false
	case chinesechess.Hidden:
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
	}
	return gameOver
}

type Range struct {
	x int
	y int
}

func (cu *chineseChessUseCase) CheckMate(id int, targetID int) bool {
	chess := cu.chineseChessRepo.FindOne(id)
	targetChess := cu.chineseChessRepo.FindOne(targetID)
	var moveRange []*Range
	switch chess.Name {
	case chinesechess.SoldiersBlack:
		moveRange = append(moveRange, &Range{x: chess.LocationX + 1, y: chess.LocationY})
		moveRange = append(moveRange, &Range{x: chess.LocationX, y: chess.LocationY + 1})
		moveRange = append(moveRange, &Range{x: chess.LocationX - 1, y: chess.LocationY})
		for _, r := range moveRange {
			if targetChess.LocationX == r.x && targetChess.LocationY == r.y {
				return true
			}
		}
		break
	case chinesechess.SoldiersRed:
		break
	case chinesechess.ChariotsBlack:
		break
	case chinesechess.ChariotsRed:
		break
	case chinesechess.CannonsBlack:
		break
	case chinesechess.CannonsRed:
		break
	}
	return false
}
