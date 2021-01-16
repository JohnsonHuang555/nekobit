import { GamePack } from "domain/models/Room";

export type NetGame = {
  id: string;
  img_url: string;
  name: string;
  modes: string[];
  game_pack: GamePack;
  brief: string;
  description: string;
  min_players: number;
  max_players: number;
  estimate_time: number;
  created_at: string;
  updated_at: string;
};
