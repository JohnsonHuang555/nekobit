import React from 'react';
import { TChineseChess } from 'src/types/ChineseChess';

type ChessItemProps = {
  chessInfo: TChineseChess;
  isSelected: boolean;
  onSelect: (id: number) => void;
};

const ChessItem = (props: ChessItemProps) => {
  const {
    chessInfo,
    isSelected,
    onSelect
  } = props;

  return (
    <div className={"map-item " + (isSelected ? "active" : "")} >
      <span
        className={"chess " + (chessInfo.side === 'RED' ? "red" : "black")}
        onClick={() => onSelect(chessInfo.id)}
      >
        {chessInfo.isFliped && (chessInfo.name)}
      </span>
    </div>
  )
};

export default ChessItem;
