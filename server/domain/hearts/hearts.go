package hearts

import (
	"server/domain"
	"server/utils"
)

type Player struct {
	UserID string         `json:"user_id"`
	Name   string         `json:"name"`
	Hand   []*utils.Poker `json:"hand"`
	Bank   bool           `json:"bank"`
	Score  int            `json:"score"`
}

type HeartsUseCase interface {
}

type HeartsRepository interface {
	FindAll() []*Player
	FindOne(id string) (*Player, error)
	UpdateHand(id string, hand []*utils.Poker) error
	UpdateScore(id string, score int) error
}

type GameData struct {
	Players    []*Player      `json:"players"`
	Round      int            `json:"round"`
	NowSuit    utils.SuitType `json:"now_suit"`
	BreakHeart bool           `json:"break_heart"`
}

func CreateHearts(users []*domain.User) *GameData {
	shuffleNumbers := utils.RandomShuffle(52) // 0~51
	pokers := utils.CreatePokers()
	shuffledPokers := []*utils.Poker{}
	for i := 0; i < 52; i++ {
		for _, poker := range pokers {
			if shuffleNumbers[i]+1 == poker.ID {
				shuffledPokers = append(shuffledPokers, poker)
			}
		}
	}

	players := []*Player{}
	nowIndex := 0
	for i := 0; i < len(users); i++ {
		hand := []*utils.Poker{}
		isBank := false
		for i := 0; i < 13; i++ {
			hand = append(hand, shuffledPokers[nowIndex])
			nowIndex++
		}

		// 梅花二先手
		for _, h := range hand {
			if h.Suit == utils.Club && h.Point == 2 {
				isBank = true
			}
		}
		player := &Player{
			UserID: users[i].ID,
			Name:   users[i].Name,
			Score:  100,
			Hand:   hand,
			Bank:   isBank,
		}
		players = append(players, player)
	}
	return &GameData{Round: 1, NowSuit: "", BreakHeart: false, Players: players}
}
