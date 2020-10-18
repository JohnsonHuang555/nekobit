package repository

import (
	"errors"
	ninjafighting "server/domain/ninja_fighting"
)

type ninjaFightingRepository struct {
	gameData *ninjafighting.GameData
}

func NewNinjaFightingRepository(gameData *ninjafighting.GameData) ninjafighting.NinjaFightingRepository {
	return &ninjaFightingRepository{gameData}
}

func (nr *ninjaFightingRepository) FindAll() [][]*ninjafighting.MapItem {
	return nr.gameData.MapItems
}

func (nr *ninjaFightingRepository) FindOne(id int) (*ninjafighting.MapItem, error) {
	x, y := nr.findMapItemByID(id)
	if x == -1 || y == -1 {
		return nil, errors.New("Map not found")
	}
	return nr.gameData.MapItems[y][x], nil
}

func (nr *ninjaFightingRepository) UpdateMapItem(id int, item *ninjafighting.Card) error {
	x, y := nr.findMapItemByID(id)
	if x == -1 || y == -1 {
		return errors.New("Map not found")
	}
	nr.gameData.MapItems[y][x].Item = item
	return nil
}

func (nr *ninjaFightingRepository) UpdateMapBomb(id int, bomb *ninjafighting.Bomb) error {
	x, y := nr.findMapItemByID(id)
	if x == -1 || y == -1 {
		return errors.New("Map not found")
	}
	nr.gameData.MapItems[y][x].Bomb = bomb
	return nil
}

func (nr *ninjaFightingRepository) UpdateHasFire(id int, hasFire bool) error {
	x, y := nr.findMapItemByID(id)
	if x == -1 || y == -1 {
		return errors.New("Map not found")
	}
	nr.gameData.MapItems[y][x].HasFire = hasFire
	return nil
}

func (nr *ninjaFightingRepository) UpdateVisible(id int, visible bool) error {
	x, y := nr.findMapItemByID(id)
	if x == -1 || y == -1 {
		return errors.New("Map not found")
	}
	nr.gameData.MapItems[y][x].Visible = visible
	return nil
}

// Character
func (nr *ninjaFightingRepository) UpdateHP(id string, value int) error {
	cIndex := nr.findUserIndexByID(id)
	if cIndex == -1 {
		return errors.New("Character not found")
	}
	nr.gameData.Characters[cIndex].HP = value
	return nil
}

func (nr *ninjaFightingRepository) UpdateBomb(id string, value int) error {
	cIndex := nr.findUserIndexByID(id)
	if cIndex == -1 {
		return errors.New("Character not found")
	}
	nr.gameData.Characters[cIndex].Bomb = value
	return nil
}

func (nr *ninjaFightingRepository) UpdateFire(id string, value int) error {
	cIndex := nr.findUserIndexByID(id)
	if cIndex == -1 {
		return errors.New("Character not found")
	}
	nr.gameData.Characters[cIndex].Fire = value
	return nil
}

func (nr *ninjaFightingRepository) UpdateItems(id string, items []*ninjafighting.Card) error {
	cIndex := nr.findUserIndexByID(id)
	if cIndex == -1 {
		return errors.New("Character not found")
	}
	nr.gameData.Characters[cIndex].Items = items
	return nil
}

func (nr *ninjaFightingRepository) UpdateSkill(id string, skills []*ninjafighting.Card) error {
	cIndex := nr.findUserIndexByID(id)
	if cIndex == -1 {
		return errors.New("Character not found")
	}
	nr.gameData.Characters[cIndex].Skills = skills
	return nil
}

func (nr *ninjaFightingRepository) UpdateDirection(id string, direction ninjafighting.Direction) error {
	cIndex := nr.findUserIndexByID(id)
	if cIndex == -1 {
		return errors.New("Character not found")
	}
	nr.gameData.Characters[cIndex].Direction = direction
	return nil
}

func (nr *ninjaFightingRepository) UpdateLocation(id string, locationX int, locationY int) error {
	cIndex := nr.findUserIndexByID(id)
	if cIndex == -1 {
		return errors.New("Character not found")
	}
	nr.gameData.Characters[cIndex].LocationX = locationX
	nr.gameData.Characters[cIndex].LocationY = locationY
	return nil
}

func (nr *ninjaFightingRepository) findMapItemByID(id int) (int, int) {
	newX := -1
	newY := -1
	for y := 0; y < len(nr.gameData.MapItems); y++ {
		for x := 0; x < len(nr.gameData.MapItems[y]); x++ {
			if nr.gameData.MapItems[y][x].ID == id {
				newX = x
				newY = y
			}
		}
	}
	return newX, newY
}

func (nr *ninjaFightingRepository) findUserIndexByID(id string) int {
	index := -1
	for i := 0; i < len(nr.gameData.Characters); i++ {
		if nr.gameData.Characters[i].UserID == id {
			// found
			index = i
		}
	}
	return index
}
