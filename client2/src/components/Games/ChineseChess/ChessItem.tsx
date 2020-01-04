import React from 'react';

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
