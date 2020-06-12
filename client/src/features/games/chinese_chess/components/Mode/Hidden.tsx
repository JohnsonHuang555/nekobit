import React from 'react';
import { TChineseChess, ChessSide } from 'src/features/games/domain/models/ChineseChess';
import MapItem from '../MapItem';

type HiddenProps = {
  chesses: TChineseChess[];
  yourTurn: boolean;
  selectedChess?: TChineseChess;
  playerSide: ChessSide;
  onSelect: (id: number) => void;
  onMove: (id: number, targetX: number, targetY: number) => void;
  onEat: (id: number, targetId: number) => void;
  onFlip: (id: number) => void;
}

const Hidden = (props: HiddenProps) => {
  const {
    chesses,
    yourTurn,
    selectedChess,
    playerSide,
    onSelect,
    onEat,
    onFlip,
    onMove,
  } = props;

  const chessMap = () => {
    let map = [];
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 8; x++) {
        const chessInfo = [...chesses].find(c => {
          return c.locationX === x && c.locationY === y && c.alive
        });

        const onMapClick = () => {
          if (!chessInfo && selectedChess) {
            onMove(selectedChess.id, x, y);
          }
        };

        const onChessClick = () => {
          if (!chessInfo || !yourTurn) { return; }
          if (!chessInfo.isFlipped) {
            onFlip(chessInfo.id);
          } else if (playerSide === chessInfo.side) {
            onSelect(chessInfo.id);
          } else if (selectedChess && selectedChess.side !== chessInfo.side) {
            onEat(selectedChess.id, chessInfo.id);
          }
        };

        const isSelected = (): boolean => {
          if (selectedChess && chessInfo) {
            if (selectedChess.id === chessInfo.id) {
              return true;
            }
          }
          return false;
        };

        map.push(
          <MapItem
            key={`x-${x}/y-${y}`}
            isSelected={isSelected()}
            chessInfo={chessInfo}
            onMapClick={onMapClick}
            onChessClick={onChessClick}
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
