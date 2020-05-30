import React from 'react';
import { TChineseChess } from 'src/features/games/domain/models/ChineseChess';

type HiddenProps = {
  chesses: TChineseChess[];
  onSelect: (id: number) => void;
  onMove: (id: number, targetX: number, targetY: number) => void;
  onEat: (id: number, targetId: number) => void;
  onFlip: (id: number) => void;
}

const Hidden = (props: HiddenProps) => {
  return (
    <div>123</div>
  )
};

export default Hidden;
