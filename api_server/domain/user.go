package domain

// Player schema structure
type Player struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	IsMaster    bool   `json:"is_master"`
	IsReady     bool   `json:"is_ready"`
	PlayOrder   int    `json:"play_order"`
	CharacterID int    `json:"character_id"`
	Group       int    `json:"group"`
}

func FilterUsers(arr []*Player, predicate func(*Player) bool) []*Player {
	out := make([]*Player, 0)
	for _, e := range arr {
		if predicate(e) {
			out = append(out, e)
		}
	}
	return out
}
