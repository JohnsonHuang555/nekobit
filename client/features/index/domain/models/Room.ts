export type Room = {
	id        string      `json:"id"` // uuid
	title     string      `json:"title"`
	password  string      `json:"password"`
	status    Status      `json:"status"`
	players   []*Player   `json:"player_list"`
	nowTurn: string;
	gameData: any;
	gamePack: GamePack;
	gameMode: string;
	createdAt: string;
};

export enum GamePack {
  ChineseChess = 'chineseChess',
}
