package domain

type SocketEvent string

const (
	JoinRoom  SocketEvent = "join_room"  // 加入房間
	LeaveRoom SocketEvent = "leave_room" // 離開房間
	ReadyGame SocketEvent = "ready_game" // 準備遊戲
	StartGame SocketEvent = "start_game" // 開始遊戲
)
