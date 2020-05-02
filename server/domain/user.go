package domain

// User schema structure
type User struct {
	ID string `json:"id"`
	// Email     string    `json:"email"`
	Name string `json:"name"`
	// Password  string    `json:"password"`
	IsMaster  bool   `json:"is_master"`
	IsReady   bool   `json:"is_ready"`
	PlayOrder int    `json:"play_order"`
	Side      string `json:"side"`
}
