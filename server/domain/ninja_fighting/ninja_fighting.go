package ninjafighting

type NinjaFightingUseCase interface {
	// Dice() int // 擲骰子
}

type NinjaFightingRepository interface {
	// MapItem
	FindAll() [][]*MapItem
	FindOne(id int) (*MapItem, error)
	UpdateMapItem(id int, item *Card) error
	UpdateMapBomb(id int, bomb *Bomb) error
	UpdateHasFire(id int, hasFire bool) error
	UpdateVisible(id int, visible bool) error

	// Character
	UpdateHP(id string, value int) error
	UpdateBomb(id string, value int) error
	UpdateFire(id string, value int) error
	UpdateItems(id string, items []*Card) error
	UpdateSkill(id string, skills []*Card) error
	UpdateDirection(id string, direction Direction) error
	UpdateLocation(id string, locationX int, locationY int) error
}
