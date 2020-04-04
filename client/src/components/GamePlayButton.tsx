import React from 'react';
import '@styles/GamePlayButton.scss';

export enum borderClass {
  THICKBLUE = 'thick-blue',
  THINBLUE = 'thin-blue',
  THICKYELLOW = 'thick-yellow',
  THINYELLOW = 'thin-yellow',
}

type GamePlayButtonProps = {
  text: string;
  borderClass: borderClass;
  className?: string;
  onClick?: () => void;
};

const GamePlayButton = (props: GamePlayButtonProps) => {
  const {
    text,
    onClick,
  } = props;
  const className = props.className ? ' ' + props.className : '';
  // const borderClass = props.borderClass ? ' ' + props.borderClass : '';
  const borderClass = ' ' + props.borderClass;
  return (
    <button
      className={`GamePlayButton${className}${borderClass}`}
      onClick={onClick}  
    >
      { text }
    </button>
  );
}

export default GamePlayButton;
