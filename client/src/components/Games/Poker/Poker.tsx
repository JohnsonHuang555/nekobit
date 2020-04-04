import React from 'react';

enum Suit {
  Spade = 'spade',
  Heart = 'heart',
  Diamond = 'diamond',
  Club = 'club',
}

type PokerProps = {
  suit: Suit;
  point: number;
}

const Poker = (props: PokerProps) => {
  const {
    suit,
    point,
  } = props;
  return (
    <div className="poker">
      <div className="point">{point}</div>
      <div className="suit">{suit}</div>
    </div>
  )
};

export default Poker;
