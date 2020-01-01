import React from 'react';
import { TChineseChess } from 'src/types/ChineseChess';

type ChessItemProps = {
  name: string;
  side: string;
  isFliped: boolean;
};

const ChessItem = (props: ChessItemProps) => {
  const {
    name,
    side,
    isFliped
  } = props;

  return (
    <>
      {isFliped && (
        <span className={side === 'RED' ? "red" : "black"}>
          {name}
        </span>
      )}
    </>
  )
};

export default ChessItem;
