import React from 'react';
import { TChineseChess } from '../../types/ChineseChess';

type ChessItemProps = {
  chessInfo: TChineseChess;
  onFlip: (id: number) => void;
};

const ChessItem = (props: ChessItemProps) => {
  const {
    chessInfo,
    onFlip
  } = props;

  return (
    <div className="map-item">
      <span className={"chess " + (chessInfo.side === 'RED' ? 'red' : 'black')} onClick={() => onFlip(chessInfo.id)}>
        {chessInfo.isFliped && (chessInfo.name)}
      </span>
    </div>
  )
};

export default ChessItem;
