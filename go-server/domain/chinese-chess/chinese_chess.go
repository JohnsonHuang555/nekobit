package chinesechess

type ChineseChessSide string

const (
	Red   ChineseChessSide = "Red"
	Black ChineseChessSide = "Black"
)

type ChineseChess struct {
	ID        int              `json:"id"`
	Side      ChineseChessSide `json:"side"`
	Name      ChineseChessName `json:"name"`
	IsFliped  bool             `json:"is_fliped"`
	LocationX int              `json:"location_x"`
	LocationY int              `json:"location_y"`
	Rank      int              `json:"rank"`
	Alive     bool             `json:"alive"`
}

type ChineseChessRepository interface {
	FindAll() []*ChineseChess
	FindOne(id int) *ChineseChess
	UpdateOne(id int, c *ChineseChess)
}

type ChineseChessUseCase interface {
	FlipChess(id int) []*ChineseChess
	EatChess(id int, targetID int) []*ChineseChess
	MoveChess(id int, locationX int, locationY int) []*ChineseChess
	CreateGame(mode GameMode) *GameData
}
