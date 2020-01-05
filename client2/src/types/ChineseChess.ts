export type TChineseChess = {
  id: number;
  side: string;
  name: string;
	isFliped: boolean;
	location: number;
	rank: number;
	alive: boolean;
}

export enum GameModeCode {
	STANDARD = 1,
	HIDDEN = 2,
}
