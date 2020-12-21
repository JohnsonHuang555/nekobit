import { useDispatch, useSelector } from "react-redux";
import { selectCanEat, selectCanMove, selectGameData, selectIsGameOver } from "../selectors/chineseChessSelector";
import { useEffect, useState } from "react";
import { reset, setGameData } from "../slices/chineseChessSlice";
import { selectRoomInfo } from "selectors/roomsSelector";
import {  ChineseChess } from "../domain/models/ChineseChess";
import { wsSendMessage } from "actions/socketAction";
import { ChineseChessSocketEvent } from "domain/models/WebSocket";
import { selectUserInfo } from "selectors/appSelector";
import Hidden from "./hidden/Hidden";
import styles from 'styles/features/chineseChess.module.scss';

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

  // 遊玩模式
  const gameMode: { [key: string]: React.ReactNode } = {
    'hidden':
      <Hidden
        room={selectedRoom}
        playerSide={playerSide}
        isYourTurn={isYourTurn}
        chineseChess={chineseChess}
        yourSide={yourSide}
        userId={userInfo.id}
        playersId={playersId}
        selectedChess={selectedChess}
        onSelectChess={(c) => setSelectedChess(c)}
      />,
    'standard': <></>,
  }

  return (
    <div className={styles.chineseChess}>
      {gameMode[selectedRoom.gameMode]}
      <div className={styles.footer}></div>
    </div>
  )
};

export default ChineseChessContainer;
