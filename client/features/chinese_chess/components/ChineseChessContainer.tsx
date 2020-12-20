import { useDispatch, useSelector } from "react-redux";
import { selectCanEat, selectCanMove, selectGameData, selectIsGameOver } from "../selectors/chineseChessSelector";
import GameMap from "./GameMap";
import styles from 'styles/features/chineseChess.module.scss';
import { useEffect, useState } from "react";
import { reset, setCanEat, setCanMove, setGameData } from "../slices/chineseChessSlice";
import { selectRoomInfo } from "selectors/roomsSelector";
import { ChessSide, ChineseChess } from "../domain/models/ChineseChess";
import { wsSendMessage } from "actions/socketAction";
import { ChineseChessSocketEvent } from "domain/models/WebSocket";
import { selectUserInfo } from "selectors/appSelector";

const ChineseChessContainer = () => {
  const dispatch = useDispatch();
  const { chineseChess, playerSide } = useSelector(selectGameData);
  const { userInfo } = useSelector(selectUserInfo);
  const { selectedRoom } = useSelector(selectRoomInfo);
  const { canEat, targeId } = useSelector(selectCanEat);
  const { canMove, targetX, targetY } = useSelector(selectCanMove);
  const { isGameOver } = useSelector(selectIsGameOver);
  const [selectedChess, setSelectedChess] = useState<ChineseChess>();

  if (!userInfo || !selectedRoom) {
    return null;
  }

  useEffect(() => {
    if (!chineseChess.length) {
      dispatch(setGameData(selectedRoom.gameData));
    }
  }, []);

  useEffect(() => {
    console.log(canEat, targeId, selectedChess)
    if (canEat && targeId !== -1 && selectedChess) {
      dispatch(wsSendMessage({
        event: ChineseChessSocketEvent.EatChess,
        player_id: userInfo.id,
        data: {
          chess_id: selectedChess.id,
          target_id: targeId,
        }
      }));
      dispatch(reset());
      setSelectedChess(undefined);
    }
  }, [canEat]);

  useEffect(() => {
    if (canMove && targetX !== -1 && targetY !== -1 && selectedChess) {
      dispatch(wsSendMessage({
        event: ChineseChessSocketEvent.MoveChess,
        player_id: userInfo.id,
        data: {
          chess_id: selectedChess.id,
          location_x: targetX,
          location_y: targetY,
        }
      }));
      dispatch(reset());
      setSelectedChess(undefined);
    }
  }, [canMove]);

  useEffect(() => {

  }, [isGameOver]);

  const isYourTurn = userInfo.id === selectedRoom.nowTurn ? true : false;
  const yourSide = playerSide[userInfo.id];
  const playersId = selectedRoom.playerList.map((p) => {
    return p.id;
  });

  const chessMap = () => {
    let map = [];
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 8; x++) {
        const targetChess = chineseChess.find(c => {
          return c.locationX === x && c.locationY === y && c.alive;
        });

        const onMapClick = () => {
          if (selectedChess) {
            dispatch(setCanMove({
              chessId: selectedChess.id,
              targetX: x,
              targetY: y,
              chesses: chineseChess,
            }))
          }
        };

        const onChessClick = () => {
          if (!targetChess || !isYourTurn) { return; }
          if (yourSide === targetChess.side) {
            setSelectedChess(targetChess);
          } else if (selectedChess && selectedChess.side !== targetChess.side) {
            // eat chess
            dispatch(setCanEat({
              chessId: selectedChess.id,
              targeId: targetChess.id, // FIXME: 打包
              targetName: targetChess.name,
              targetRank: targetChess.rank,
              targetX: targetChess.locationX,
              targetY: targetChess.locationY,
              chesses: chineseChess,
            }))
          }
        };

        const onFlip = (c: ChineseChess) => {
          if (!targetChess || !isYourTurn) { return; }
          dispatch(wsSendMessage({
            event: ChineseChessSocketEvent.FlipChess,
            player_id: userInfo.id,
            data: {
              chess_id: c.id,
              chinese_chess_side: c.side,
              players_id: playersId,
            }
          }));
          setSelectedChess(undefined);
        };

        if (targetChess) {
          map.push(
            <div className={styles.itemContainer} key={`x-${x}/y-${y}`}>
              {targetChess.isFliped ?
                (
                  <span
                    className={`${styles.flipedChess} ${targetChess.side === ChessSide.Black ? styles.black : styles.red} ${selectedChess?.id === targetChess.id ? styles.selectedChess : ''}`}
                    onClick={() => onChessClick()}
                  >
                    <span>{targetChess.name}</span>
                    <span className={`${styles.circle} ${targetChess.side === ChessSide.Red ? styles.red : ''}`}></span>
                  </span>
                ) : (
                  <span
                    className={styles.notFlipedChess}
                    onClick={() => onFlip(targetChess)}
                  />
                )
              }
            </div>
          )
        } else {
          map.push(
            <div
              className={styles.itemContainer}
              key={`x-${x}/y-${y}`}
              onClick={() => onMapClick()}
            ></div>
          )
        }
      }
    }
    return map;
  }

  return (
    <div className={styles.chineseChess}>
      <div className={styles.header}>
        <div className={styles.players}>
          <span className={styles.name}>{selectedRoom.playerList[0].name}</span>
          <span>VS</span>
          <span className={styles.name}>{selectedRoom.playerList[1].name}</span>
        </div>
        <div className={styles.sides}>
          <span>{playerSide[selectedRoom.playerList[0].id]}</span>
          <span className={isYourTurn ? styles.yourTurn : styles.otherTurn}>
            {isYourTurn ? '你的回合' : '對方回合'}
          </span >
          <span>{playerSide[selectedRoom.playerList[1].id]}</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.map}>
          <GameMap />
          <div className={styles.chesses}>
            {/* FIXME: 判斷大盤小盤 */}
            {chessMap()}
          </div>
        </div>
      </div>
      <div className={styles.footer}></div>
    </div>
  )
};

export default ChineseChessContainer;
