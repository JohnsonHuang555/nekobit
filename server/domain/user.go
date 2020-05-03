package domain

// User schema structure
type User struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	IsMaster  bool   `json:"is_master"`
	IsReady   bool   `json:"is_ready"`
	PlayOrder int    `json:"play_order"`
	Side      string `json:"side"`
	// Email     string    `json:"email"`
	// Password  string    `json:"password"`
}
