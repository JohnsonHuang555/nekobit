export type TChineseChess = {
  id: number;
  side: string;
  name: string;
	isFlipped: boolean;
	location: number;
	locationX: number;
	locationY: number;
	rank: number;
	alive: boolean;
}

export enum GameModeCode {
	Standard = 1,
	Hidden = 2,
}
