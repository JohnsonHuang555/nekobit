import { OptionType } from "components/Select";
import { GameMode as ChineseChessModes } from "features/chinese_chess/domain/models/ChineseChess";
import { GamePack } from "./Room";

export type Game = {
  id: string;
  name: string;
  modes: OptionType[];
  gamePack: GamePack;
  minPlayers: number;
  maxPlayers: number;
  brief: string;
  description: string;
  imgUrl: string;
  estimateTime: number;
  createAt: string; // FIXME:
  updateAt: string; // FIXME:
};

export const EnhanceGame: {
  [key in GamePack.ChineseChess | GamePack.Chess]: { [key: string]: string };
} = {
  [GamePack.ChineseChess]: ChineseChessModes,
  [GamePack.Chess]: ChineseChessModes,
};
