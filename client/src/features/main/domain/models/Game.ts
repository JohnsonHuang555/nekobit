import { GameModeCode } from "src/features/games/domain/models/ChineseChess";

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

export type TCreateRoom = {
  title: string;
  password?: string;
  mode: number;
  gameID: string;
}

export type TModeValue = {
  label: string;
  value: number;
};

export enum GameList {
  ChineseChess = '5de1f7ddac5b6c1002ece8f1',
}

export const GameMode: { [key: string]: TModeValue[] } = {
  [GameList.ChineseChess]: [
    {label: '標準(大盤)', value: GameModeCode.Standard},
    {label: '暗棋(小盤)', value: GameModeCode.Hidden}
  ],
};
