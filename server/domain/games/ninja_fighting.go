package ninjafighting

// Character 角色
type Character struct {
	UserID string  `json:"user_id"`
	HP     int     `json:"hp"`
	Bomb   int     `json:"bomb"`
	Fire   int     `json:"fire"`
	Item   []*Card `json:"item"`
	Skill  []*Card `json:"skill"`
}

type CardType string

const (
	Attack     CardType = "Attack"
	Functional CardType = "Functional"
	Defense    CardType = "Defense"
)

type Target string

const (
	All    Target = "All"
	Single Target = "Single"
	Self   Target = "Self"
)

// Card 卡
type Card struct {
	ID          int      `json:"id"`
	Name        string   `json:"name"`
	Type        CardType `json:"type"`
	Target      Target   `json:"target"`
	Description string   `json:"description"`
}

// Bomb 炸彈
type Bomb struct {
	ID          int `json:"id"`
	RemainRound int `json:"remain_round"`
	Fire        int `json:"fire"`
}

type MapEvent string

const (
	Gate        MapEvent = "Gate"        // 傳送門
	Hospital    MapEvent = "Hospital"    // 醫院
	Shop        MapEvent = "Shop"        // 道具抽抽樂
	Dojo        MapEvent = "Dojo"        // 道場
	Exclamation MapEvent = "Exclamation" // 驚嘆號
)

// Map 地圖
type Map struct {
	ID        int      `json:"id"`
	LocationX int      `json:"location_x"`
	LocationY int      `json:"location_y"`
	Item      Card     `json:"item"`
	Bomb      Bomb     `json:"bomb"`
	HasFire   bool     `json:"has_fire"`
	Visible   bool     `json:"visible"`
	Event     MapEvent `json:"event"`
}
