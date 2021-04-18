import { GamePack } from 'domain/models/Room';
import { OptionType } from 'domain/models/OptionType';
import { GameMode as ChineseChessModes } from 'features/chinese_chess/domain/models/ChineseChess';

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
