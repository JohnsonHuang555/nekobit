import _ from 'lodash';
import { NetChineseChess } from 'src/features/games/domain/remote/NetChineseChess';
import { TChineseChess } from 'src/features/games/domain/models/ChineseChess';

export class ChineseChessFactory {
  static createArrayFromNet(netChineseChesses: NetChineseChess[]): TChineseChess[] {
    return netChineseChesses.map((netChineseChess) => this.createFromNet(netChineseChess));
  }

  static createFromNet(netChineseChess: NetChineseChess): TChineseChess {
    return _.mapKeys(netChineseChess, (value, key) => (_.camelCase(key))) as TChineseChess;
  }
}
