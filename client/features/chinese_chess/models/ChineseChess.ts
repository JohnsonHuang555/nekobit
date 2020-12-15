import { ChessName } from "features/chinese_chess/models/ChessName";

export type ChineseChess = {
  id: number;
  side: ChessSide;
  name: ChessName;
  isFliped: boolean;
  locationX: number;
  locationY: number;
  rank: number;
  alive: boolean;
};

export enum ChessSide {
  Red = 'RED',
  Black = 'BLACK',
}
