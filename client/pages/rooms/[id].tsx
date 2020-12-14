import React, { useEffect } from 'react';
import Button from 'components/Button';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { SocketEvent } from 'domain/models/WebSocket';
import { selectRoomInfo } from 'selectors/roomsSelector';
import { selectUserInfo } from 'selectors/appSelector';
import styles from 'styles/pages/rooms.module.scss';
import { GamePack, GameStatus } from 'domain/models/Room';
import PlayerList from 'components/pages/rooms/PlayerList';
import GameScreen from 'components/pages/rooms/GameScreen';
import { wsConnect, wsDisconnect, wsSendMessage } from 'actions/socketAction';
import { selectIsConnected } from 'selectors/webSocketSelector';

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = router.query.id;
  const { selectedRoom } = useSelector(selectRoomInfo);
  const { isConnected } = useSelector(selectIsConnected);
  const { userInfo } = useSelector(selectUserInfo);

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
    return () => {

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

  const isNowPlayer = (id: string) => {
    if (userInfo && userInfo.id === id) {
      return true;
    }
    return false;
  }

  const playerInfo = () => {
    if (!selectedRoom || !userInfo) {
      return;
    }
    return selectedRoom.playerList.find(player => {
      return player.id === userInfo.id;
    });
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
              <div className={styles.content}></div>
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
                  event: SocketEvent.StartGame,
                  player_id: userInfo.id,
                  data: {
                    game_pack: GamePack.ChineseChess,
                    game_mode: 'hidden',
                  }
                }))}
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
          {selectedRoom.status === GameStatus.Playing &&
            <GameScreen gamePack={selectedRoom.gamePack}/>
          }
        </div>
      }
    </Layout>
  )
};

export default Room;
