import { ChessName } from "../models/ChessName";
import { ChessSide } from "../models/ChineseChess";
import { PlayerSide } from "../models/PlayerSide";

export type NetGameData = {
  chinese_chess: NetChineseChess[];
  player_side: PlayerSide;
};

export type NetChineseChess = {
  id: number;
  side: ChessSide;
  name: ChessName;
  is_fliped: boolean;
  location_X: number;
  location_Y: number;
  rank: number;
  alive: boolean;
}
