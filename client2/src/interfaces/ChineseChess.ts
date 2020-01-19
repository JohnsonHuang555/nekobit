import { TChineseChess } from "src/types/ChineseChess";

export interface IChineseChess {
  gameData: any;
  selectedChess?: TChineseChess;

  onClearSelectedChess: () => void;
  onSelect: (id: number) => void;
  onMove: (data: any) => void;
  onEat: (data: any) => void;
  onGameOver: () => void;
}

