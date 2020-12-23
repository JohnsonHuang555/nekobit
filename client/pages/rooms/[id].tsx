import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { SocketEvent } from 'domain/models/WebSocket';
import {
  selectIsReadyToStart,
  selectRoomInfo,
  selectShowGameScreen
} from 'selectors/roomsSelector';
import { selectUserInfo } from 'selectors/appSelector';
import styles from 'styles/pages/rooms.module.scss';
import { GamePack } from 'domain/models/Room';
import PlayerList from 'components/rooms/PlayerList';
import GameScreen from 'components/rooms/GameScreen';
import { wsConnect, wsDisconnect, wsSendMessage } from 'actions/socketAction';
import { selectIsConnected } from 'selectors/webSocketSelector';
import { setIsReadyToStart } from 'slices/roomsSlice';

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = router.query.id;
  const { selectedRoom } = useSelector(selectRoomInfo);
  const { isConnected } = useSelector(selectIsConnected);
  const { userInfo } = useSelector(selectUserInfo);
  const { showGameScreen } = useSelector(selectShowGameScreen);
  const { isReadyToStart } = useSelector(selectIsReadyToStart);
  const [startingCount, setStartingCount] = useState(5); // 倒數五秒遊戲開始

  useEffect(() => {
    return () => {
      dispatch(wsDisconnect())
    }
  }, []);

  useEffect(() => {
    if (roomId) {
      const host = `ws://localhost:5000/ws/${roomId}`;
      dispatch(wsConnect(host));
    }
  }, [roomId]);

  useEffect(() => {
    if (isConnected && userInfo) {
      dispatch(wsSendMessage({
        event: SocketEvent.JoinRoom,
        player_id: userInfo.id,
        data: {
          player_name: userInfo.name,
        }
      }));
    }
  }, [isConnected]);

  useEffect(() => {
    let interval: any = null;
    if (isReadyToStart) {
      interval = setInterval(() => {
        setStartingCount(seconds => seconds - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isReadyToStart]);

  useEffect(() => {
    // 房主開始遊戲
    if (startingCount === 0 && playerInfo()?.isMaster) {
      dispatch(wsSendMessage({
        event: SocketEvent.StartGame,
        player_id: userInfo?.id as string,
        data: {
          game_pack: GamePack.ChineseChess,
          game_mode: 'hidden',
        }
      }));
    }
  }, [startingCount]);

  useEffect(() => {
    if (!showGameScreen) {
      dispatch(setIsReadyToStart(false));
      setStartingCount(5);
    }
  }, [showGameScreen]);

  const isNowPlayer = (id: string) => {
    if (userInfo && userInfo.id === id) {
      return true;
    }
    return false;
  };

  const playerInfo = () => {
    if (!selectedRoom || !userInfo) {
      return;
    }
    return selectedRoom.playerList.find(player => {
      return player.id === userInfo.id;
    });
  };

  const isReadyToPlay = (): boolean => {
    const notReadyPlayers = selectedRoom?.playerList.filter(p => !p.isReady);
    if (notReadyPlayers?.length !== 0) {
      return false;
    }
    return true;
  };

  // FIXME: 要切三塊 components，container 保持乾淨
  return (
    <Layout>
      {userInfo && isConnected && selectedRoom &&
        <div className={styles.mainArea}>
          <div className={styles.leftArea}>
            <PlayerList selectedRoom={selectedRoom} isNowPlayer={player => isNowPlayer(player)}/>

            {/* // TODO: 聊天 */}
            <div className={`${styles.block} ${styles.messages}`}>
              <div className={styles.content}>遊戲準備開始 {startingCount} ...</div>
            </div>
          </div>
          <div className={`${styles.rightArea} ${styles.block}`}>

            {/* // TODO: 遊戲設定 */}
            <div className={styles.content}></div>
            {playerInfo()?.isMaster ?
              <Button
                title="開始遊戲"
                color="secondary"
                onClick={() => dispatch(wsSendMessage({
                  event: SocketEvent.ReadyToStart,
                  player_id: userInfo.id,
                }))}
                disabled={!isReadyToPlay()}
              /> :
              <Button
                title={playerInfo()?.isReady ? '取消準備' : '準備遊戲'}
                color="secondary"
                onClick={() => dispatch(wsSendMessage({
                  event: SocketEvent.ReadyGame,
                  player_id: userInfo.id,
                }))}
              />
            }
            <Button title="離開房間" color="grey-4" />
          </div>
          {showGameScreen &&
            <GameScreen gamePack={selectedRoom.gamePack} />
          }
        </div>
      }
    </Layout>
  )
};

export default Room;
