import React from 'react';
import { TChineseChess } from 'src/types/ChineseChess';
import ChessItem from 'src/components/Games/ChineseChess/ChessItem';

type ChessMapItemProps = {
  chessInfo: TChineseChess;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const ChessMapItem = (props: ChessMapItemProps) => {
  const {
    chessInfo,
    isSelected,
    onSelect,
  } = props;
  return (
    <div className="map-item">
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
