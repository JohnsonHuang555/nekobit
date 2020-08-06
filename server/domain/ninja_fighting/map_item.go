package ninjafighting

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
	All    Target = "All"
	Single Target = "Single"
	Self   Target = "Self"
)

const (
	Gate        MapEvent = "Gate"        // 傳送門
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
	Item      Card     `json:"item"`
	Bomb      Bomb     `json:"bomb"`
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

func CreateClassicMap(size MapSize) [][]*MapItem {
	myMap := [][]*MapItem{}
	SingleMap := MapItem{}
	SingleMap.ID = 1

	for y := 0; y < 7; y++ {
		ArrayMap := []*MapItem{}
		for i := 0; i < 7; i++ {
			if y == 0 || y == 6 {
				ArrayMap = append(ArrayMap, &SingleMap)
			} else {
				if i == 0 || i == 6 {
					ArrayMap = append(ArrayMap, &SingleMap)
				} else {
					ArrayMap = append(ArrayMap, nil)
				}
			}

		}
		myMap = append(myMap, ArrayMap)
	}

	return myMap
}
