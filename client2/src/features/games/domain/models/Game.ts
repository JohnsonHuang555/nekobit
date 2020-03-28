import { GameModeCode } from "src/types/ChineseChess";

export type TGame = {
  id: string;
  imgURL: string;
  name: string;
  brief: string;
  description: string;
  createdDate: string;
  rules: [];
  maxPlayers: number;
  estimateTime: number;
}

export const GameMode = {
  '象棋': [
    {label: '標準(大盤)', value: GameModeCode.Standard},
    {label: '暗棋(小盤)', value: GameModeCode.Hidden}
  ],
};
