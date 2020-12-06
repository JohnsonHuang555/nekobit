import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import Layout from 'components/Layout';
import Icon, { IconType } from 'components/Icon';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { SocketEvent, WebSocketParams } from 'domain/models/WebSocket';
import { joinRoom, readyGame, startGame } from 'slices/roomsSlice';
import { RoomFactory } from 'domain/factories/RoomFactory';
import { selectRoomInfo } from 'selectors/roomsSelector';
import { selectUserInfo } from 'selectors/appSelector';
import styles from 'styles/pages/rooms.module.scss';
import { PlayerFactory } from 'domain/factories/PlayerFactory';
import { GamePack } from 'domain/models/Room';

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = router.query.id;
  const { selectedRoom } = useSelector(selectRoomInfo);
  const [ws, setWs] = useState<WebSocket>();
  const { userInfo } = useSelector(selectUserInfo);

  useEffect(() => {
    if (roomId && userInfo) {
      runSocket();
    }
  }, [roomId, userInfo]);

  const runSocket = () => {
    console.log(99999)
    if (!userInfo) {
      return;
    }
    const tmpWs = new WebSocket(`ws://localhost:5000/ws/${roomId}`);
    setWs(tmpWs);

    const data = {
      event: SocketEvent.JoinRoom,
      player_id: userInfo.id,
      data: {
        player_name: userInfo.name,
      }
    }
    tmpWs.onopen = function() {
      tmpWs.send(JSON.stringify(data));
    };
  };

  useEffect(() => {
    if (ws) {
      ws.onmessage = msg => {
        const {
          event,
          data,
        }: WebSocketParams = JSON.parse(msg.data);
        console.log(1111)
        switch (event) {
          case SocketEvent.JoinRoom: {
            const room = RoomFactory.createFromNet(data.room_info);
            dispatch(joinRoom(room));
            break;
          }
          case SocketEvent.ReadyGame: {
            const players = PlayerFactory.createArrayFromNet(data.players);
            dispatch(readyGame(players));
            break;
          }
          case SocketEvent.StartGame: {
            const room = RoomFactory.createFromNet(data.room_info);
            console.log(room)
            dispatch(startGame(room));
            break;
          }
        }
      };
    }
  }, [ws])

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

  const onReadyGame = () => {
    if (!ws || !userInfo) {
      return;
    }
    const data = {
      event: SocketEvent.ReadyGame,
      player_id: userInfo.id,
      data: {},
    }
    ws.send(JSON.stringify(data));
  };

  const onStartGame = () => {
    if (!ws || !userInfo) {
      return;
    }
    const data = {
      event: SocketEvent.StartGame,
      player_id: userInfo.id,
      data: {
        game_pack: GamePack.ChineseChess,
        game_mode: 'hidden',
      }
    }
    ws.send(JSON.stringify(data));
  };

  return (
    <Layout>
      {ws && selectedRoom && <div className={styles.mainArea}>
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
                <div key={player.id} className={`${styles.player} ${isNowPlayer(player.id) ? styles.nowPlayer : ''}`}>
                  <div
                    className={styles.picture}
                    style={{ backgroundImage: "url('https://images.pexels.com/photos/3541389/pexels-photo-3541389.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')" }}
                  />
                  <div className={styles.info}>
                    <div className={`${styles.playerName} ${isNowPlayer(player.id) ? styles.nowPlayerName : ''}`}>
                      {player.name}
                    </div>
                    {!player.isMaster ?
                      <div className={`${player.isReady ? styles.ready : styles.notReady}`}>
                        Ready
                      </div> :
                      <div className={styles.master}>
                        <Icon
                          type={IconType.Crown}
                          label="房主"
                          size="lg"
                          color="dark-warning"
                        />
                      </div>
                    }
                  </div>
                  {/* TODO: 踢人 */}
                  {/* {player.isMaster && isNowPlayer(player.id) &&
                    <div className={styles.delete}>
                      <Icon type={IconType.Times} />
                    </div>
                  } */}
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
          {playerInfo()?.isMaster ?
            <Button
              title="開始遊戲"
              color="secondary"
              onClick={() => onStartGame()}
            /> :
            <Button
              title={playerInfo()?.isReady ? '取消準備' : '準備遊戲'}
              color="secondary"
              onClick={() => onReadyGame()}
            />
          }
          <Button title="離開房間" color="grey-4" />
        </div>
      </div>}
    </Layout>
  )
};

export default Room;
