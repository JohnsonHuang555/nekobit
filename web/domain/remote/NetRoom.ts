import { GamePack, GameStatus } from 'domain/models/Room';
import { NetPlayer } from './NetPlayer';

export type NetRoom = {
  id: string;
  title: string;
  password: string;
  status: GameStatus;
  player_list: NetPlayer[];
  now_turn: string;
  game_data: any;
  game_pack: GamePack;
  game_mode: string;
  create_at: string;
};

export type NetCheckJoinRoomRespose = {
  can_join: boolean;
  message: string;
};
