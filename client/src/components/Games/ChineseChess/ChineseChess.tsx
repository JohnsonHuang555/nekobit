import React, { useState, useEffect } from 'react';
import { TChineseChess } from '../../../types/ChineseChess';
import '../../../assets/styles/games/chineseChess.scss';
import ChessItem from './ChessItem';

type ChineseChessProps = {
  chineseChessData?: TChineseChess[];
  onFlip: (id: number) => void;
}

const ChineseChess = (props: ChineseChessProps) => {
  const {
    chineseChessData,
    onFlip
  } = props;

  return (
    <div className="chinese-chess-container">
      {chineseChessData && chineseChessData.map(chessInfo =>
        <ChessItem
          key={chessInfo.id}
          chessInfo={chessInfo}
          onFlip={onFlip}
        />
      )}
    </div>
  )
}

export default ChineseChess;
