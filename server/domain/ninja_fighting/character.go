package ninjafighting

type Direction string

const (
	Clockwise     Direction = "Clockwise"     // 順時鐘方向
	AntiClockwise Direction = "AntiClockwise" // 逆時鐘方向
)

// Character 角色
type Character struct {
	UserID    string    `json:"user_id"`
	HP        int       `json:"hp"`
	Bomb      int       `json:"bomb"`
	Fire      int       `json:"fire"`
	Item      []*Card   `json:"item"`
	Skill     []*Card   `json:"skill"`
	Direction Direction `json:"direction"`
}
