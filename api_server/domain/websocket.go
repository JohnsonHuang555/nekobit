package domain

type MsgData struct {
	UserID string     `json:"user_id"`
	Event  string     `json:"event"`
	Data   Attachment `json:"data"`
}

type Attachment struct {
	UserName     string      `json:"user_name,omitempty"`
	IsMaster     bool        `json:"is_master,omitempty"`
	IsReady      bool        `json:"is_ready,omitempty"`
	GameData     interface{} `json:"game_data,omitempty"`
	GameID       string      `json:"game_id,omitempty"`
	RoomPassword string      `json:"room_password,omitempty"`
	RoomTitle    string      `json:"room_title,omitempty"`
	RoomMode     int         `json:"room_mode,omitempty"`
	RoomStatus   int         `json:"room_status,omitempty"`
	RoomUserList []*Player   `json:"room_userlist,omitempty"`
	Rooms        []*Room     `json:"rooms,omitempty"`
	RoomInfo     *Room       `json:"room_info,omitempty"`
	NowTurn      string      `json:"now_turn,omitempty"`
	CharacterID  int         `json:"character_id,omitempty"`
	Group        int         `json:"group,omitempty"`
}
