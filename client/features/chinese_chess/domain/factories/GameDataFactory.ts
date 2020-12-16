import _ from 'lodash';
import { ChineseChess } from '../models/ChineseChess';
import { PlayerSide } from '../models/PlayerSide';
import { NetGameData } from '../remote/NetGameData';
import { ChineseChessFactory } from './ChineseChessFactory';

export type ChineseChessGameData = {
  chineseChess: ChineseChess[];
  playerSide: PlayerSide;
}

export class GameDataFactory {
  static createFromNet(netChess: NetGameData): ChineseChessGameData {
    const { chinese_chess, player_side } = netChess;
    const chineseChess = ChineseChessFactory.createArrayFromNet(chinese_chess);
    return {
      chineseChess,
      playerSide: player_side,
    }
  }
}
