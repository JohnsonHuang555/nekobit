import { NetUser } from "src/features/main/domain/remote/NetUser";

export type NetRoom = {
  id: string;
  mode: number;
  now_turn: string;
  password: string;
  room_number: number;
  status: number;
  title: string;
  user_list: NetUser[];
  game_id: string;
  game_data: any;
  create_at: string;
};
