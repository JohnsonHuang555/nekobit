import React from 'react';
import { TChineseChess } from 'src/types/ChineseChess';
import ChessItem from 'src/components/Games/ChineseChess/ChessItem';

type ChessMapItemProps = {
  chessInfo?: TChineseChess;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onMove: () => void;
}

const ChessMapItem = (props: ChessMapItemProps) => {
  const {
    chessInfo,
    isSelected,
    onSelect,
    onMove,
  } = props;

  const checkChessExist = () => {
    if (chessInfo) return;
    onMove();
  }

  return (
    <div className="map-item" onClick={checkChessExist}>
      {chessInfo && (
        <div
          className={"chess " + (isSelected ? "active" : "")}
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
