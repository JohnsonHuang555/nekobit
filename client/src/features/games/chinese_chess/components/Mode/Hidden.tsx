import React from 'react';
import { TChineseChess } from 'src/features/games/domain/models/ChineseChess';
import MapItem from '../MapItem';

type HiddenProps = {
  chesses: TChineseChess[];
  yourTurn: boolean;
  onSelect: (id: number) => void;
  onMove: (id: number, targetX: number, targetY: number) => void;
  onEat: (id: number, targetId: number) => void;
  onFlip: (id: number) => void;
}

const Hidden = (props: HiddenProps) => {
  const {
    chesses,
    yourTurn,
    onSelect,
    onEat,
    onFlip,
    onMove,
  } = props;

  const chessMap = () => {
    let map = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 8; j++) {
        const chessInfo = [...chesses].find(c => {
          return c.locationX === j && c.locationY === i
        });

        const onMapClick = () => {
          if (chessInfo) {
            if (!chessInfo.isFlipped && yourTurn) {
              onFlip(chessInfo.id);
            }
          }
        };

        map.push(
          <MapItem
            key={`x-${j}/y-${i}`}
            chessInfo={chessInfo}
            onMapClick={onMapClick}
          />
        );
      }
    }
    return map;
  }

  return (
    <div className="hidden">
      {chessMap()}
    </div>
  )
};

export default Hidden;
