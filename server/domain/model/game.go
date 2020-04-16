package model

// Game schema structure
type Game struct {
	id           string
	name         string
	maxPlayers   int
	rules        []string
	brief        string
	description  string
	imgURL       string
	estimateTime int
	createdDate  string
}

func (g *Game) GetGame() *Game {
	return &Game{
		id:         g.id,
		name:       g.name,
		maxPlayers: g.maxPlayers,
		rules:      g.rules,
	}
}
