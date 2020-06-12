export type TChineseChess = {
  id: number;
  side: ChessSide;
  name: string;
	isFlipped: boolean;
	locationX: number;
	locationY: number;
	rank: number;
	alive: boolean;
}

export enum GameModeCode {
	Standard = 1,
	Hidden = 2,
}

export enum ChessSide {
  Red = 'RED',
  Black = 'BLACK'
}
