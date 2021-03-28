import { GamePack } from 'domain/Room';

export type OptionType = {
  label: string;
  value: string;
};

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
