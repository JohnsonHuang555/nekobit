import React from 'react';
import '@styles/games/chineseChess.scss';
import ChessItem from './ChessItem';
import { TChineseChess } from '../../types/ChineseChess';

type ChineseChessProps = {
  chineseChessData: TChineseChess[];
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
