import { useDispatch, useSelector } from "react-redux";
import { selectCanEat, selectCanMove, selectGameData, selectIsGameOver } from "../selectors/chineseChessSelector";
import React, { useEffect, useState } from "react";
import { reset, setGameData, setGameOver } from "../slices/chineseChessSlice";
import { selectRoomInfo } from "selectors/roomsSelector";
import {  ChessSide, ChineseChess } from "../domain/models/ChineseChess";
import { wsSendMessage } from "actions/socketAction";
import { ChineseChessSocketEvent } from "domain/models/WebSocket";
import { selectUserInfo } from "selectors/appSelector";
import Hidden from "./hidden/Hidden";
import styles from 'styles/features/chineseChess.module.scss';
import Modal from "components/Modal";
import Button from "components/Button";
import { setShowGameScreen } from "slices/roomsSlice";

const ChineseChessContainer = () => {
  const dispatch = useDispatch();
  const { chineseChess, playerSide } = useSelector(selectGameData);
  const { userInfo } = useSelector(selectUserInfo);
  const { selectedRoom } = useSelector(selectRoomInfo);
  const { canEat, targeId } = useSelector(selectCanEat);
  const { canMove, targetX, targetY } = useSelector(selectCanMove);
  const { isGameOver } = useSelector(selectIsGameOver);
  const [selectedChess, setSelectedChess] = useState<ChineseChess>();
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  if (!userInfo || !selectedRoom) {
    return null;
  }

  useEffect(() => {
    if (!chineseChess.length) {
      dispatch(setGameData(selectedRoom.gameData));
    }
  }, []);

  useEffect(() => {
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
    if (isGameOver) {
      setShowGameOverModal(true);
    }
  }, [isGameOver]);

  const isYourTurn = userInfo.id === selectedRoom.nowTurn ? true : false;
  const yourSide = playerSide[userInfo.id];
  const playersId = selectedRoom.playerList.map((p) => {
    return p.id;
  });
  const gameOver = (): string => {
    const blackChesses = chineseChess.filter(c => c.alive && c.side === ChessSide.Black);
    if (blackChesses.length === 0 && yourSide === ChessSide.Black) {
      return '你輸了~ GG';
    }
    return '你贏了!!';
  }

  // 遊玩模式
  const gameMode: { [key: string]: React.ReactNode } = {
    'hidden':
      <Hidden
        room={selectedRoom}
        playerSide={playerSide}
        isYourTurn={isYourTurn}
        chineseChess={chineseChess}
        yourSide={yourSide}
        userInfo={userInfo}
        playersId={playersId}
        selectedChess={selectedChess}
        onSelectChess={(c) => setSelectedChess(c)}
      />,
    'standard': <></>,
  }

  const onCloseModal = () => {
    setShowGameOverModal(false);
    dispatch(setGameOver(false));
  };

  return (
    <>
      <Modal
        show={showGameOverModal}
        title="Game Over"
        onCloseModal={() => onCloseModal()}
      >
        <div className={styles.gameOver}>{gameOver()}</div>
        <Button
          title="確認"
          color="secondary"
          onClick={() => onCloseModal()}
          customStyles={{ marginBottom: '10px' }}
        />
        <Button
          title="離開"
          color="grey-4"
          onClick={() => {
            setShowGameOverModal(false);
            dispatch(setGameOver(false));
            dispatch(setShowGameScreen(false));
          }}
        />
      </Modal>
      <div className={styles.chineseChess}>
        {gameMode[selectedRoom.gameMode]}
        <div className={styles.footer}></div>
      </div>
    </>
  )
};

export default ChineseChessContainer;
