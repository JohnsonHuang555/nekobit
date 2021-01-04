import { Player } from "./Player";

export type Room = {
	id: string;
	title: string;
	password: string;
	status: GameStatus;
	playerList: Player[];
	nowTurn: string;
	gameData: any;
	gamePack: GamePack;
	gameMode: string; // FIXME: 擴充列舉
	createdAt: string;
};

export enum GamePack {
  ChineseChess = 'chinese_chess',
  Chess = 'chess',
}

export enum GameStatus {
	Preparing = 'preparing',
	Playing = 'playing',
}
