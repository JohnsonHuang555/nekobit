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
