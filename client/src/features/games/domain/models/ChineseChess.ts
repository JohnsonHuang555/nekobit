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

export enum ChessName {
  KingBlack = '將',
  KingRed = '帥',
  GuardsBlack = '士',
  GuardsRed = '仕',
  MinisterBlack = '象',
  MinisterRed = '相',
  ChariotsBlack = '車',
  ChariotsRed = '俥',
  CannonsBlack = '包',
  CannonsRed = '炮',
  HorsesBlack = '馬',
  HorsesRed = '傌',
  SoldiersBlack = '卒',
  SoldiersRed = '兵',
}
