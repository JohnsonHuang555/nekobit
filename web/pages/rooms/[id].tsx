import { setSnackbar } from 'actions/AppAction';
import { checkJoinRoom, reset } from 'actions/RoomAction';
import { wsConnect, wsSendMessage } from 'actions/WebSocketAction';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from 'selectors/AppSelector';
import {
  checkJoinSelector,
  createdIdSelector,
  roomSelector,
} from 'selectors/RoomSelector';
import { isConnectedSelector } from 'selectors/WebsocketSelector';
import PlayerList from 'components/pages/room/PlayerList';
import ChatArea from 'components/pages/room/ChatArea';
import GameScreen from 'components/pages/room/GameScreen';
import { Button } from '@material-ui/core';
import styles from 'styles/pages/room.module.scss';
import { SocketEvent } from 'domain/models/WebSocket';

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = router.query.id;
  const checkJoinObj = useSelector(checkJoinSelector);
  const userInfo = useSelector(userInfoSelector);
  const { roomInfo, gameInfo } = useSelector(roomSelector);
  const isConnected = useSelector(isConnectedSelector);

  // 拿到 roomId 後打 checkJoinRoom
  useEffect(() => {
    if (roomId) {
      dispatch(checkJoinRoom(String(roomId)));
    }
  }, [roomId]);

  useEffect(() => {
    if (checkJoinObj) {
      const { canJoin, message } = checkJoinObj;
      if (!canJoin) {
        dispatch(
          setSnackbar({
            message,
            show: true,
          })
        );
        dispatch(reset());
        // 導回首頁
        router.push('/');
        return;
      }
      // connent websocket to server
      const host = `ws://localhost:5000/ws/${roomId}`;
      dispatch(wsConnect(host));
    }
  }, [checkJoinObj]);

  useEffect(() => {
    const leaveRoomHandler = (e: BeforeUnloadEvent) => {
      dispatch(
        wsSendMessage({
          event: SocketEvent.LeaveRoom,
          player_id: userInfo?.id as string,
        })
      );
      console.log(123456);
      router.push('/');
    };
    if (isConnected) {
      if (!userInfo) {
        dispatch(
          setSnackbar({
            show: true,
            message: '請先登入',
          })
        );
        return;
      }
      window.addEventListener('unload', leaveRoomHandler);
      // join room
      dispatch(
        wsSendMessage({
          event: SocketEvent.JoinRoom,
          player_id: userInfo.id,
          data: {
            player_name: userInfo.name,
          },
        })
      );
    }
    return () => {
      window.removeEventListener('unload', leaveRoomHandler);
    };
  }, [isConnected, userInfo]);

  const isNowPlayer = (id: string) => {
    if (userInfo && userInfo.id === id) {
      return true;
    }
    return false;
  };

  const playerInfo = () => {
    return roomInfo?.playerList.find((player) => {
      return player.id === userInfo?.id;
    });
  };

  const isReadyToPlay = (): boolean => {
    if (!gameInfo || !roomInfo) {
      return false;
    }
    const { playerList } = roomInfo;
    const { maxPlayers } = gameInfo;
    const notReadyPlayers = playerList.filter((p) => !p.isReady);
    if (notReadyPlayers?.length !== 0 || maxPlayers > playerList.length) {
      return false;
    }
    return true;
  };

  return (
    <Layout>
      {userInfo && isConnected && roomInfo && gameInfo && (
        <div className={styles.mainArea}>
          <div className={styles.leftArea}>
            <PlayerList
              roomInfo={roomInfo}
              isNowPlayer={(player) => isNowPlayer(player)}
            />
            {/* // TODO: 聊天 */}
            <div className={`${styles.block} ${styles.messages}`}>
              <div className={`${styles.content} ${styles.chat}`}>
                <ChatArea
                  messages={['hi', 'yo', 'hello']}
                  startingCount={0}
                  onSubmit={() => {}}
                />
              </div>
            </div>
          </div>
          <div className={`${styles.rightArea} ${styles.block}`}>
            {/* // TODO: 遊戲設定 */}
            <div className={styles.content}></div>
            {playerInfo()?.isMaster ? (
              <Button
                variant="outlined"
                onClick={() =>
                  dispatch(
                    wsSendMessage({
                      event: SocketEvent.ReadyToStart,
                      player_id: userInfo.id,
                    })
                  )
                }
                disabled={!isReadyToPlay()}
              >
                開始遊戲
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() =>
                  dispatch(
                    wsSendMessage({
                      event: SocketEvent.ReadyGame,
                      player_id: userInfo.id,
                    })
                  )
                }
              >
                {playerInfo()?.isReady ? '取消準備' : '準備遊戲'}
              </Button>
            )}
            <Button variant="outlined">離開房間</Button>
          </div>
          {/* {false && <GameScreen gamePack={roomInfo.gamePack} />} */}
        </div>
      )}
    </Layout>
  );
};

export default Room;
