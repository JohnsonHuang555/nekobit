import React from 'react';
import ChessItem from 'src/features/games/chinese_chess/components/ChessItem';
import { TChineseChess } from 'src/types/ChineseChess';

type ChessMapItemProps = {
  chessInfo?: TChineseChess;
  isSelected: boolean;
  isRotate?: boolean;
  onSelect: (id: number) => void;
}

const ChessMapItem = (props: ChessMapItemProps) => {
  const {
    chessInfo,
    isSelected,
    isRotate,
    onSelect,
  } = props;

  return (
    <>
      {chessInfo && (
        <div
          className={"chess " + (isSelected ? "active " : "") + (chessInfo.isFliped ? "isFliped " : "") + (isRotate && 'rotate')}
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
