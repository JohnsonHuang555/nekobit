package ninjafighting

import (
	"server/domain"
	"server/utils"
)

// enums
type CardType string
type Target string
type MapEvent string

const (
	Attack     CardType = "Attack"
	Functional CardType = "Functional"
	Defense    CardType = "Defense"
)

const (
	All     Target = "All"
	Single  Target = "Single"
	Self    Target = "Self"
	Partial Target = "Partial"
	None    Target = "None"
)

const (
	Gate1       MapEvent = "Gate1"       // 傳送門 1 兩個互通
	Gate2       MapEvent = "Gate2"       // 傳送門 2
	Hospital    MapEvent = "Hospital"    // 醫院
	Shop        MapEvent = "Shop"        // 道具抽抽樂
	Dojo        MapEvent = "Dojo"        // 道場
	Exclamation MapEvent = "Exclamation" // 驚嘆號
)

// Card 卡
type Card struct {
	ID     int      `json:"id"`
	Name   string   `json:"name"`
	Type   CardType `json:"type"`
	Target Target   `json:"target"`
	// Status..
	Description string `json:"description"`
}

// Bomb 炸彈
type Bomb struct {
	ID          int `json:"id"`
	RemainRound int `json:"remain_round"`
	Fire        int `json:"fire"`
}

// MapItem 地圖
type MapItem struct {
	ID        int      `json:"id"`
	LocationX int      `json:"location_x"`
	LocationY int      `json:"location_y"`
	Item      *Card    `json:"item,omitempty"`
	Bomb      *Bomb    `json:"bomb,omitempty"`
	HasFire   bool     `json:"has_fire"`
	Visible   bool     `json:"visible"`
	Event     MapEvent `json:"event"`
}

type NinjaFightingUseCase interface {
	// Dice() int // 擲骰子
}

type NinjaFightingRepository interface {
	// FindAll() []*MapItem
	// FindOne(id int) (*MapItem, error)
	// UpdateItem(id int, newItem Card, isClear bool) error
	// UpdateBomb(id int, newBomb Bomb, isClear bool) error
	// UpdateHasFire(id int, hasFire bool) error
	// UpdateVisible(id int, visible bool) error
}

type MapSize string

const (
	Small  MapSize = "Small"
	Medium MapSize = "Medium"
	Large  MapSize = "Large"
)

type GameData struct {
	MapItems   [][]*MapItem `json:"map_items"`
	Characters []*Character `json:"characters"`
	Round      int          `json:"round"`
}

type eventLocation struct {
	name MapEvent
	x    int
	y    int
}

func CreateClassicMap(size MapSize, users []*domain.User) *GameData {
	classicMap := [][]*MapItem{}
	characters := []*Character{}
	mapID := 1
	round := 1

	for _, user := range users {
		characters = append(characters, &Character{
			UserID: user.ID,
			HP:     100,
			Bomb:   1,
			Fire:   1,
			Item:   []*Card{},
			Skill:  []*Card{},
		})
	}

	var topX []int
	var bottomX []int
	var leftY []int
	var rightY []int

	// create random items
	topX = utils.RandomSampling(0, 6, 3)
	bottomX = utils.RandomSampling(0, 6, 3)
	// 檢查是否有物品
	if utils.IsIncludeNumber(topX, 0) && utils.IsIncludeNumber(bottomX, 0) {
		leftY = utils.RandomSampling(1, 5, 1)
	} else if utils.IsIncludeNumber(topX, 0) || utils.IsIncludeNumber(bottomX, 0) {
		leftY = utils.RandomSampling(1, 5, 2)
	} else {
		leftY = utils.RandomSampling(1, 5, 3)
	}
	if utils.IsIncludeNumber(topX, 6) && utils.IsIncludeNumber(bottomX, 6) {
		rightY = utils.RandomSampling(1, 5, 1)
	} else if utils.IsIncludeNumber(topX, 6) || utils.IsIncludeNumber(bottomX, 6) {
		rightY = utils.RandomSampling(1, 5, 2)
	} else {
		rightY = utils.RandomSampling(1, 5, 3)
	}

	for y := 0; y < 7; y++ {
		row := []*MapItem{}
		for x := 0; x < 7; x++ {
			mapItem := &MapItem{
				ID: mapID,
			}
			mapItem.Event = getEvent(x, y)
			switch y {
			case 0:
				if utils.IsIncludeNumber(topX, x) {
					index := utils.RandomNumber(0, 2)
					mapItem.Item = CardItems[index]
				}
				mapItem.LocationX = x
				mapItem.LocationY = y
				row = append(row, mapItem)
				mapID++
			case 6:
				if utils.IsIncludeNumber(bottomX, x) {
					index := utils.RandomNumber(0, 2)
					mapItem.Item = CardItems[index]
				}
				mapItem.LocationX = x
				mapItem.LocationY = y
				row = append(row, mapItem)
				mapID++
			default:
				switch x {
				case 0:
					if utils.IsIncludeNumber(leftY, y) {
						index := utils.RandomNumber(0, 2)
						mapItem.Item = CardItems[index]
					}
					row = append(row, mapItem)
					mapItem.LocationX = x
					mapItem.LocationY = y
					mapID++
				case 6:
					if utils.IsIncludeNumber(rightY, y) {
						index := utils.RandomNumber(0, 2)
						mapItem.Item = CardItems[index]
					}
					row = append(row, mapItem)
					mapItem.LocationX = x
					mapItem.LocationY = y
					mapID++
				default:
					row = append(row, nil)
				}
			}
		}
		classicMap = append(classicMap, row)
	}

	return &GameData{MapItems: classicMap, Characters: characters, Round: round}
}

func getEvent(x int, y int) MapEvent {
	// FIXME: 地圖事件不能寫死
	mapEvents := [6]eventLocation{
		{
			name: Gate1,
			x:    6,
			y:    0,
		},
		{
			name: Gate2,
			x:    0,
			y:    6,
		},
		{
			name: Hospital,
			x:    6,
			y:    3,
		},
		{
			name: Dojo,
			x:    2,
			y:    0,
		},
		{
			name: Shop,
			x:    4,
			y:    6,
		},
		{
			name: Exclamation,
			x:    0,
			y:    2,
		},
	}
	var temp MapEvent
	for _, event := range mapEvents {
		if event.x == x && event.y == y {
			temp = event.name
		}
	}
	return temp
}
