// 管理所有 Socket Evnet
package domain

type SocketEvent string

const (
	JoinRoom  SocketEvent = "join_room"  // 加入房間
	LeaveRoom SocketEvent = "leave_room" // 離開房間
	ReadyGame SocketEvent = "ready_game" // 準備遊戲
	StartGame SocketEvent = "start_game" // 開始遊戲
	Surrender SocketEvent = "surrender"  // 投降

	// chinese chess
	FlipChess SocketEvent = "flip_chess" // 翻棋
	MoveChess SocketEvent = "move_chess" // 移動棋子
	EatChess  SocketEvent = "eat_chess"  // 吃棋
)
