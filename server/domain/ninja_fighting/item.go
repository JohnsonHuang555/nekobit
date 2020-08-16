package ninjafighting

var CardItems = map[int]*Card{
	0: {
		ID:          1,
		Name:        "炸彈",
		Description: "會爆炸",
		Target:      Partial,
		Type:        Attack,
	},
	1: {
		ID:          2,
		Name:        "火藥",
		Description: "增加爆炸範圍",
		Target:      None,
		Type:        Attack,
	},
	2: {
		ID:          3,
		Name:        "定時炸彈",
		Description: "幾回合後爆炸",
		Target:      Self,
		Type:        Attack,
	},
}
