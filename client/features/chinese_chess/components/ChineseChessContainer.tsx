import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGameData } from "../selectors/chineseChessSelector";
import GameMap from "./GameMap";
import styles from 'styles/features/chineseChess.module.scss';
import { setGameData } from "../slices/chineseChessSlice";

const ChineseChessContainer = () => {
  const dispatch = useDispatch();
  const { chineseChess, playerSide } = useSelector(selectGameData);

  const chessMap = () => {
    let map = [];
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 8; x++) {
        const chess = chineseChess.find(c => {
          return c.locationX === x && c.locationY === y && c.alive;
        });

        const onMapClick = () => {
          // if (!chessInfo && selectedChess) {
          //   onMove(x, y);
          // }
        };

        const onChessClick = () => {
          // if (!chessInfo || !yourTurn) { return; }
          // if (playerSide === chessInfo.side) {
          //   onSelect(chessInfo);
          // } else if (selectedChess && selectedChess.side !== chessInfo.side) {
          //   onEat(chessInfo);
          // }
        };

        const isSelected = (): boolean => {
          // if (selectedChess && chessInfo) {
          //   if (selectedChess.id === chessInfo.id) {
          //     return true;
          //   }
          // }
          return false;
        };

        if (chess) {
          map.push(
            <div className={styles.itemContainer}>
              <span className={styles.item}>{chess.name}</span>
            </div>
          )
        } else {
          map.push(
            <div className={styles.itemContainer}>
              <span className={styles.item} />
            </div>
          )
        }

      }
    }
    return map;
  }

  return (
    <div className={styles.chineseChess}>
      <div className={styles.map}>
        <GameMap />
        <div className={styles.chesses}>
          {chessMap()}
        </div>
      </div>
    </div>
    //  <div>qwe</div>
  )
};

export default ChineseChessContainer;
