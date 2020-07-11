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
}

export type TModeVaule = {
  label: string;
  value: number;
};

export const GameMode: { [key: string]: TModeVaule[] } = {
  '5d62a35bd986c21bc010c00b': [
    {label: '標準(大盤)', value: GameModeCode.Standard},
    {label: '暗棋(小盤)', value: GameModeCode.Hidden}
  ],
};

export enum GameList {
  ChineseChess = '5d62a35bd986c21bc010c00b',
}
