import { Player } from "./Player";

export type Room = {
	id: string;
	title: string;
	password: string;
	status: GameStatus;
	players: Player[];
	nowTurn: string;
	gameData: any;
	gamePack: GamePack;
	gameMode: string;
	createdAt: string;
};

export enum GamePack {
  ChineseChess = 'chineseChess',
}

export enum GameStatus {
	Preparing = 'preparing',
	Playing = 'playing',
}
