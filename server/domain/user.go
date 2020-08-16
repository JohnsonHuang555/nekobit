package domain

// User schema structure
type User struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	IsMaster    bool   `json:"is_master"`
	IsReady     bool   `json:"is_ready"`
	PlayOrder   int    `json:"play_order"`
	Side        string `json:"side"`
	CharacterID int    `json:"character_id"`
	// Email     string    `json:"email"`
	// Password  string    `json:"password"`
}

func FilterUsers(arr []*User, predicate func(*User) bool) []*User {
	out := make([]*User, 0)
	for _, e := range arr {
		if predicate(e) {
			out = append(out, e)
		}
	}
	return out
}
