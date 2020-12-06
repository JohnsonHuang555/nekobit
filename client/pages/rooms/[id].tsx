import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import Layout from 'components/Layout';
import Icon, { IconType } from 'components/Icon';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { SocketEvent, WebSocketParams } from 'domain/models/WebSocket';
import { joinRoom } from 'slices/roomsSlice';
import { RoomFactory } from 'domain/factories/RoomFactory';
import { selectRoomInfo } from 'selectors/roomsSelector';
import styles from 'styles/pages/rooms.module.scss';
import { selectUserInfo } from 'selectors/appSelector';

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = router.query.id;
  const { selectedRoom } = useSelector(selectRoomInfo);
  const [ws, setWs] = useState<WebSocket>();
  const { userInfo } = useSelector(selectUserInfo);

  const sendMessage = (data: WebSocketParams) => {
    ws?.send(JSON.stringify(data))
  };

  useEffect(() => {
    if (roomId) {
      setWs(new WebSocket(`ws://localhost:5000/ws/${roomId}`));
    }
  }, [dispatch, roomId]);

  useEffect(() => {
    if (ws && userInfo) {
      ws.onopen = () => {
        console.log('open connection')
        const data = {
          event: SocketEvent.JoinRoom,
          player_id: userInfo.id,
          data: {
            player_name: userInfo.name,
          }
        }
        sendMessage(data);
      }
      ws.onmessage = e => {
        const {
          event,
          data,
          player_id
        }: WebSocketParams = JSON.parse(e.data);
        switch (event) {
          case SocketEvent.JoinRoom: {
            const room = RoomFactory.createFromNet(data.room_info);
            console.log('joooooooo', room)
            dispatch(joinRoom(room))
            break;
          }
        }
      }
    }
    return () => {
      ws?.close();
    }
  }, [ws]);

  // TODO: 做 loading...
  if (!ws || !selectedRoom) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.mainArea}>
        <div className={styles.leftArea}>
          <div className={`${styles.block} ${styles.playerList}`}>
            <div className={styles.header}>
              <div className={styles.roomInfo}>
                <div className={styles.roomNumber}>001</div>
                  <div className={styles.roomTitle}>{selectedRoom.title}</div>
              </div>
              <Icon type={IconType.EditSquare} label="編輯" />
            </div>
            <div className={styles.content}>
              {selectedRoom.playerList.map(player => (
                // Now Player
                <div key={player.id} className={`${styles.player}`}>
                  <div
                    className={styles.picture}
                    style={{ backgroundImage: "url('https://images.pexels.com/photos/3541389/pexels-photo-3541389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')" }}
                  />
                  <div className={styles.info}>
                    <div className={styles.playerName}>
                      {player.name}
                    </div>
                    <div className={styles.readyStatus}>
                      Ready
                    </div>
                  </div>
                  {player.isMaster &&
                    <div className={styles.delete}>
                      <Icon type={IconType.Times} />
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>
          {/* // TODO: 聊天 */}
          <div className={`${styles.block} ${styles.messages}`}>
            <div className={styles.content}></div>
          </div>
        </div>
        <div className={`${styles.rightArea} ${styles.block}`}>
          {/* // TODO: 遊戲設定 */}
          <div className={styles.content}></div>
          <Button title="開始遊戲" color="secondary" />
          <Button title="離開房間" color="grey-4" />
        </div>
      </div>
    </Layout>
  )
};

export default Room;
