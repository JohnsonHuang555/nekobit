import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import Layout from 'components/Layout';
import styles from 'styles/pages/rooms.module.scss';
import { Player } from 'domain/models/Player';
import Icon, { IconType } from 'components/Icon';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { SocketEvent, WebSocketParams } from 'domain/models/WebSocket';

const playerList: Player[] = [
  {
    id: '1234',
    name: 'Johnson1',
    isMaster: true,
    isReady: true,
    playOrder: 0,
    group: 1,
  },
  {
    id: '222',
    name: 'Johnson2',
    isMaster: false,
    isReady: false,
    playOrder: 0,
    group: 1,
  },
  {
    id: '333',
    name: 'Johnson3',
    isMaster: false,
    isReady: false,
    playOrder: 0,
    group: 2,
  },
  {
    id: '444',
    name: 'Johnson4',
    isMaster: false,
    isReady: true,
    playOrder: 0,
    group: 2,
  },
];

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = router.query.id;
  const [ws, setWs] = useState<WebSocket>();

  useEffect(() => {
    if (roomId) {
      setWs(new WebSocket(`ws://localhost:5000/ws/${roomId}`));
    }
  }, [dispatch, roomId]);

  useEffect(() => {
    if (ws) {
      ws.onopen = () => {
        console.log('open connection')
        const data = {
          event: SocketEvent.JoinRoom,
          player_id: 'asd-ddf',
          data: {
            player_name: 'Johnson',
          }
        }
        sendMessage(data);
      }
      ws.onmessage = event => {
        const data: WebSocketParams = JSON.parse(event.data)
        switch (data.event) {
          case SocketEvent.JoinRoom: {
            alert("join room");
            break;
          }
        }
        console.log(data)
      }
    }
    return () => {
      ws?.close();
    }
  }, [ws]);

  if (!ws) {
    return null;
  }

  const sendMessage = (data: WebSocketParams) => {
    ws.send(JSON.stringify(data))
  };

  return (
    <Layout>
      <div className={styles.mainArea}>
        <div className={styles.leftArea}>
          <div className={`${styles.block} ${styles.playerList}`}>
            <div className={styles.header}>
              <div className={styles.roomInfo}>
                <div className={styles.roomNumber}>001</div>
                <div className={styles.roomTitle}>快來 PK</div>
              </div>
              <Icon type={IconType.EditSquare} label="編輯" />
            </div>
            <div className={styles.content}>
              {playerList.map(player => (
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
