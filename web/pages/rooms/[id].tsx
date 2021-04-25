import { setSnackbar } from 'actions/AppAction';
import { checkJoinRoom } from 'actions/RoomAction';
import { wsConnect, wsSendMessage } from 'actions/WebSocketAction';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userInfoSelector } from 'selectors/AppSelector';
import { checkJoinSelector } from 'selectors/RoomSelector';
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
      console.log(123);
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
      console.log(456);
    }
  }, [isConnected, userInfo]);

  return (
    <Layout>
      <div className={styles.mainArea}>123</div>
    </Layout>
  );
};

export default Room;
