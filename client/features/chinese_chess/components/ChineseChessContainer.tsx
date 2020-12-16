import { useDispatch, useSelector } from "react-redux";
import { selectGameData } from "../selectors/chineseChessSelector";
import GameMap from "./GameMap";
import styles from 'styles/features/chineseChess.module.scss';
import { useEffect } from "react";
import { setGameData } from "../slices/chineseChessSlice";
import { selectRoomInfo } from "selectors/roomsSelector";
import { ChessSide } from "../domain/models/ChineseChess";
import { wsSendMessage } from "actions/socketAction";
import { ChineseChessSocketEvent } from "domain/models/WebSocket";
import { selectUserInfo } from "selectors/appSelector";

const ChineseChessContainer = () => {
  const dispatch = useDispatch();
  const { chineseChess, playerSide } = useSelector(selectGameData);
  const { userInfo } = useSelector(selectUserInfo);
  const { selectedRoom } = useSelector(selectRoomInfo);

  if (!userInfo) {
    return null;
  }

  useEffect(() => {
    if (!chineseChess.length) {
      dispatch(setGameData(selectedRoom?.gameData));
    }
  }, [])

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
            <div className={styles.itemContainer} key={`x-${x}/y-${y}`}>
              {chess.isFliped ?
                <span className={`${styles.flipedChess} ${chess.side === ChessSide.Black ? styles.black : styles.red}`}>
                  <span>{chess.name}</span>
                  <span className={`${styles.circle} ${chess.side === ChessSide.Red ? styles.red : ''}`}></span>
                </span> :
                <span className={styles.notFlipedChess} onClick={() => dispatch(wsSendMessage({
                  event: ChineseChessSocketEvent.FlipChess,
                  player_id: userInfo.id,
                  data: {
                    chess_id: chess.id,
                    chinese_chess_side: chess.side,
                  }
                }))}></span>
              }
            </div>
          )
        } else {
          map.push(
            <div className={styles.itemContainer} key={`x-${x}/y-${y}`}></div>
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
  )
};

export default ChineseChessContainer;
