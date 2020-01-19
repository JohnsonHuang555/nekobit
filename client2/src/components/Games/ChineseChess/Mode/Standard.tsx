import React from 'react';
import { IChineseChess } from 'src/interfaces/ChineseChess';

interface StandardProps extends IChineseChess {}

const Standard = (props: StandardProps) => {
  const {
    gameData,
    selectedChess,
    onSelect,
  } = props;

  const onEat = () => {

  }

  const onMove = () => {

  }

  const isInRange = () => {

  }

  return (
    <div>123</div>
  );
};

export default Standard;
