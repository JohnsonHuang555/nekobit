import React, { useEffect, useState } from 'react';
import Button from 'components/Button';
import Layout from 'components/Layout';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { SocketEvent, WebSocketParams } from 'domain/models/WebSocket';
import { joinRoom, readyGame, startGame } from 'slices/roomsSlice';
import { RoomFactory } from 'domain/factories/RoomFactory';
import { selectRoomInfo } from 'selectors/roomsSelector';
import { selectUserInfo } from 'selectors/appSelector';
import styles from 'styles/pages/rooms.module.scss';
import { PlayerFactory } from 'domain/factories/PlayerFactory';
import { GamePack, GameStatus } from 'domain/models/Room';
import PlayerList from 'components/pages/rooms/PlayerList';
import GameScreen from 'components/pages/rooms/GameScreen';
import { wsConnect } from 'actions/socketAction';

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = router.query.id;
  const { selectedRoom } = useSelector(selectRoomInfo);
  const [ws, setWs] = useState<WebSocket>();
  const { userInfo } = useSelector(selectUserInfo);

  useEffect(() => {
    if (roomId) {
      const host = `ws://localhost:5000/ws/${roomId}`;
      dispatch(wsConnect(host));
    }
  }, [roomId]);

  const runSocket = () => {
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
  }, [ws]);

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

  // FIXME: 要切三塊 components，container 保持乾淨
  return (
    <Layout>
      {ws && selectedRoom &&
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
          {selectedRoom.status === GameStatus.Playing &&
            <GameScreen />
          }
        </div>
      }
    </Layout>
  )
};

export default Room;
