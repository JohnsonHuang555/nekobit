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
		chesses = chinesechess.GetChesses()
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

func (cu *chineseChessUseCase) CheckGameOver(pid string, playerSides map[string]chinesechess.ChineseChessSide, gameMode domain.GameMode, nowChesses []*chinesechess.ChineseChess) bool {
	gameOver := true
	switch gameMode {
	case chinesechess.Standard:
		gameOver = false
		for _, chess := range nowChesses {
			if chess.ID == 1 && chess.Alive != true {
				gameOver = true
				break
			} else if chess.ID == 17 && chess.Alive != true {
				gameOver = true
				break
			}
		}
	case chinesechess.Hidden:
		var anotherPlayerSide chinesechess.ChineseChessSide
		for key, side := range playerSides {
			if key != pid {
				anotherPlayerSide = side
			}
		}

		for _, chess := range nowChesses {
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

func (cu *chineseChessUseCase) CheckMate(id int) bool {
	checkMate := false
	chess := cu.chineseChessRepo.FindOne(id)
	var targetID int
	// RED side id 17
	// BLACK side id 1
	// 紅方殺黑方
	if chess.Side == chinesechess.Red {
		targetID = 1
	} else {
		targetID = 17
	}

	targetChess := cu.chineseChessRepo.FindOne(targetID)
	var moveRange []*Range
	switch chess.Name {
	case chinesechess.SoldiersBlack:
		moveRange = append(moveRange, &Range{x: chess.LocationX + 1, y: chess.LocationY})
		moveRange = append(moveRange, &Range{x: chess.LocationX, y: chess.LocationY + 1})
		moveRange = append(moveRange, &Range{x: chess.LocationX - 1, y: chess.LocationY})
		break
	case chinesechess.SoldiersRed:
		moveRange = append(moveRange, &Range{x: chess.LocationX, y: chess.LocationY - 1})
		moveRange = append(moveRange, &Range{x: chess.LocationX - 1, y: chess.LocationY})
		moveRange = append(moveRange, &Range{x: chess.LocationX + 1, y: chess.LocationY})
		break
	case chinesechess.ChariotsBlack, chinesechess.ChariotsRed:
		tempCheckMate := true
		if chess.LocationX == targetChess.LocationX {
			total := math.Abs(float64(chess.LocationY-targetChess.LocationY)) - 1
			for i := 0; i < int(total); i++ {
				var foundChess *chinesechess.ChineseChess
				if targetChess.LocationY > chess.LocationY {
					foundChess = cu.chineseChessRepo.FindOneByLocation(targetChess.LocationX, chess.LocationY+i+1)
				} else {
					foundChess = cu.chineseChessRepo.FindOneByLocation(targetChess.LocationX, targetChess.LocationY+i+1)
				}
				if foundChess != nil {
					tempCheckMate = false
					break
				}
			}
		} else if chess.LocationY == targetChess.LocationY {
			total := math.Abs(float64(chess.LocationX-targetChess.LocationX)) - 1
			for i := 0; i < int(total); i++ {
				var foundChess *chinesechess.ChineseChess
				if targetChess.LocationX > chess.LocationX {
					foundChess = cu.chineseChessRepo.FindOneByLocation(chess.LocationX+i+1, targetChess.LocationY)
				} else {
					foundChess = cu.chineseChessRepo.FindOneByLocation(targetChess.LocationX+i+1, targetChess.LocationY)
				}
				if foundChess != nil {
					tempCheckMate = false
					break
				}
			}
		} else {
			tempCheckMate = false
		}
		checkMate = tempCheckMate
		break
	case chinesechess.HorsesBlack, chinesechess.HorsesRed:
		horseRanges := []string{"xAdd", "xMinus", "yAdd", "yMinus"}
		for _, h := range horseRanges {
			switch h {
			case "xAdd":
				// 拐馬腳
				obstacle := cu.chineseChessRepo.FindOneByLocation(chess.LocationX+1, chess.LocationY)
				if obstacle != nil {
					break
				}
				moveRange = append(moveRange, &Range{x: chess.LocationX + 2, y: chess.LocationY + 1})
				moveRange = append(moveRange, &Range{x: chess.LocationX + 2, y: chess.LocationY - 1})
				break
			case "xMinus":
				obstacle := cu.chineseChessRepo.FindOneByLocation(chess.LocationX-1, chess.LocationY)
				if obstacle != nil {
					break
				}
				moveRange = append(moveRange, &Range{x: chess.LocationX - 2, y: chess.LocationY + 1})
				moveRange = append(moveRange, &Range{x: chess.LocationX - 2, y: chess.LocationY - 1})
				break
			case "yAdd":
				obstacle := cu.chineseChessRepo.FindOneByLocation(chess.LocationX, chess.LocationY+1)
				if obstacle != nil {
					break
				}
				moveRange = append(moveRange, &Range{x: chess.LocationX + 1, y: chess.LocationY + 2})
				moveRange = append(moveRange, &Range{x: chess.LocationX - 1, y: chess.LocationY + 2})
				break
			case "yMinus":
				obstacle := cu.chineseChessRepo.FindOneByLocation(chess.LocationX, chess.LocationY-1)
				if obstacle != nil {
					break
				}
				moveRange = append(moveRange, &Range{x: chess.LocationX + 1, y: chess.LocationY - 2})
				moveRange = append(moveRange, &Range{x: chess.LocationX - 1, y: chess.LocationY - 2})
				break
			}
		}
		break
	case chinesechess.CannonsBlack, chinesechess.CannonsRed:
		var foundChesses []*chinesechess.ChineseChess
		if chess.LocationX == targetChess.LocationX {
			total := math.Abs(float64(chess.LocationY-targetChess.LocationY)) - 1
			for i := 0; i < int(total); i++ {
				if targetChess.LocationY > chess.LocationY {
					locationChess := cu.chineseChessRepo.FindOneByLocation(targetChess.LocationX, chess.LocationY+i+1)
					if locationChess != nil {
						foundChesses = append(foundChesses, locationChess)
					}
				} else {
					locationChess := cu.chineseChessRepo.FindOneByLocation(targetChess.LocationX, targetChess.LocationY+i+1)
					if locationChess != nil {
						foundChesses = append(foundChesses, locationChess)
					}
				}
			}
		} else if chess.LocationY == targetChess.LocationY {
			total := math.Abs(float64(chess.LocationX-targetChess.LocationX)) - 1
			for i := 0; i < int(total); i++ {
				if targetChess.LocationX > chess.LocationX {
					locationChess := cu.chineseChessRepo.FindOneByLocation(chess.LocationX+i+1, targetChess.LocationY)
					if locationChess != nil {
						foundChesses = append(foundChesses, locationChess)
					}
				} else {
					locationChess := cu.chineseChessRepo.FindOneByLocation(targetChess.LocationX+i+1, targetChess.LocationY)
					if locationChess != nil {
						foundChesses = append(foundChesses, locationChess)
					}
				}
			}
		}
		if len(foundChesses) == 1 {
			checkMate = true
		}
		break
	}
	for _, r := range moveRange {
		if targetChess.LocationX == r.x && targetChess.LocationY == r.y {
			checkMate = true
		}
	}
	return checkMate
}
