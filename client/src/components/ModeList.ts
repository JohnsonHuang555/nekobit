import { GameModeCode } from "src/features/games/domain/models/ChineseChess";

export const GameListMode: any = {
  '象棋': [
    {label: '標準(大盤)', value: GameModeCode.Standard},
    {label: '暗棋(小盤)', value: GameModeCode.Hidden}
  ],
}
