import { GamePack } from "./Room";

export type Game = {
  id: string;
  name: string;
  gamePack: GamePack;
  minPlayers: number;
  maxPlayers: number;
  brief: string;
  description: string;
  imgUrl: string;
  estimateTime: number;
  createAt: string; // FIXME:
  updateAt: string; // FIXME:
}

export const GameMode: {[key: string]: string} = {
  hidden: '暗棋(小盤)',
  standard: '暗棋(小盤)',
};
