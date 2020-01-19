import React from 'react';
import ChessItem from 'src/components/Games/ChineseChess/ChessItem';
import { TChineseChess } from 'src/types/ChineseChess';

type ChessMapItemProps = {
  chessInfo?: TChineseChess;
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
    <>
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
    </>
  )
}

export default ChessMapItem;
