import _ from "lodash";
import { ChineseChess } from "../models/ChineseChess";
import { NetChineseChess } from "../remote/NetGameData";

export class ChineseChessFactory {
  static createArrayFromNet(
    netChineseChesses: NetChineseChess[]
  ): ChineseChess[] {
    return netChineseChesses.map((netChineseChess) =>
      this.createFromNet(netChineseChess)
    );
  }

  static createFromNet(netChineseChess: NetChineseChess): ChineseChess {
    return _.mapKeys(netChineseChess, (v, key) =>
      _.camelCase(key)
    ) as ChineseChess;
  }
}
