package utils

type SuitType string

type Poker struct {
	ID    int      `json:"id"`
	Suit  SuitType `json:"suit"`
	Point int      `json:"point"`
}

const (
	Spade   SuitType = "Spade"
	Heart   SuitType = "Heart"
	Diamond SuitType = "Diamond"
	Club    SuitType = "Club"
)

// 52 張
func CreatePokers() []*Poker {
	pokers := []*Poker{}
	suits := []SuitType{Spade, Heart, Diamond, Club}
	pokerID := 1
	for _, suit := range suits {
		for i := 0; i < 13; i++ {
			pokers = append(pokers, &Poker{
				ID:    pokerID,
				Suit:  suit,
				Point: i + 1, // from 1
			})
			pokerID++
		}
	}
	return pokers
}
