import { GameModeCode } from "src/types/ChineseChess";

export type TGame = {
  id: string;
  imgUrl: string;
  name: string;
  brief: string;
  description: string;
  createdDate: string;
  rules: [];
  maxPlayers: number;
  estimateTime: number;
}

export const GameMode = {
  '5de1f7ddac5b6c1002ece8f1': [
    {label: '標準(大盤)', value: GameModeCode.Standard},
    {label: '暗棋(小盤)', value: GameModeCode.Hidden}
  ],
};

export enum GameList {
  ChineseChess = '5de1f7ddac5b6c1002ece8f1',
}
