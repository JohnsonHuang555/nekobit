import React from 'react';
import ChessItem from 'src/components/Games/ChineseChess/ChessItem';
import { TChineseChess } from 'src/types/ChineseChess';

type ChessMapItemProps = {
  chessInfo?: TChineseChess;
  isSelected: boolean;
  mode: number;
  onSelect: (id: number) => void;
  onMove: () => void;
}

const ChessMapItem = (props: ChessMapItemProps) => {
  const {
    chessInfo,
    isSelected,
    mode,
    onSelect,
    onMove,
  } = props;

  const checkChessExist = () => {
    if (chessInfo) return;
    onMove();
  }

  return (
    <div className={"map-item " + (mode === 1 ? 'standard' : '')} onClick={checkChessExist}>
      {chessInfo && (
        <div
          className={"chess " + (isSelected ? "active " : "") + (chessInfo.isFliped ? "isFliped" : "")}
          onClick={() => onSelect(chessInfo.id)}
        >
          <ChessItem
            name={chessInfo.name}
            side={chessInfo.side}
            isFliped={chessInfo.isFliped}
          />
        </div>
      )}
    </div>
  )
}

export default ChessMapItem;
