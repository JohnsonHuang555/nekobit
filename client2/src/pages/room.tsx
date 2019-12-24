import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TSocket } from '../types/Socket';
import { TRoom, TRoomUser } from '../types/Room';
import Layout from "../components/Layout"
import useLocalStorage from '../customHook/useLocalStorage';
import RoomUser from '../components/RoomList/RoomUser';
import Button from '../components/Shared/Button';
import ChineseChess from '../components/Games/ChineseChess';
import { TChineseChess } from '../types/ChineseChess';

const Room = () => {
  const router = useRouter();
  const [userInfo] = useLocalStorage('userInfo', null);
  const [ws, setWs] = useState<WebSocket>();
  const [roomInfo, setRoomInfo] = useState<TRoom>();

  useEffect(() => {
    if (!router.query) {
      return;
    }
    let ws: WebSocket = new WebSocket(`ws://localhost:8080/ws/${router.query.id}`)
    ws.onopen = () => {
      console.log(`Successfully Connected in Room <${router.query.id}>`);
      const sendData = JSON.stringify({
        userID: userInfo.id,
        event: 'joinRoom',
        data: {
          name: userInfo.name,
          roomID: Number(router.query.id)
        }
      })
      ws.send(sendData);
      setWs(ws);
    };

    ws.onclose = (e) => {
      console.log('Socket Closed Connection: ', e);
    };

    ws.onerror = (error) => {
      console.log('Socket Error: ', error);
      ws.close();
    };

    initialOnListening(ws);

    return () => {
      ws.close();
    }
  }, [router.query]);

  const initialOnListening = (ws: WebSocket) => {
    let tempRoomInfo: TRoom;
    if (ws) {
      ws.onmessage = (websocket: MessageEvent) => {
        const wsData: TSocket = JSON.parse(websocket.data);
        if (!wsData) return;
        if (wsData.event === 'joinRoom') {
          tempRoomInfo = wsData.data.roomInfo;
          setRoomInfo(wsData.data.roomInfo);
        } else if (wsData.event === 'readyGame') {
          if (!tempRoomInfo) return;
          setRoomInfo({
            ...tempRoomInfo,
            userList: wsData.data.roomUserList
          });
        } else if (wsData.event === 'startGame') {
          if (!tempRoomInfo) return;
          tempRoomInfo = wsData.data.roomInfo;
          setRoomInfo({
            ...tempRoomInfo,
            gameData: wsData.data.roomInfo.gameData
          });
        }
      }
    }
  }

  const isMaster = () => {
    if (userInfo) {
      const user = roomInfo && roomInfo.userList.find(u => {
        return u.id === userInfo.id;
      });

      return user ? user.isMaster : false;
    }
    return false;
  };

  const startGame = () => {
    if (ws) {
      const sendData = JSON.stringify({
        userID: userInfo.id,
        event: 'startGame',
        data: {
          roomID: Number(router.query.id)
        }
      })
      ws.send(sendData);
    }
  }

  const readyGame = () => {
    if (ws) {
      const sendData = JSON.stringify({
        userID: userInfo.id,
        event: 'readyGame',
        data: {
          roomID: Number(router.query.id)
        }
      })
      ws.send(sendData);
    }
  }

  const disabledStart = () => {
    return roomInfo && roomInfo.userList.find(u => {
      return u.isReady === false;
    }) ? true : false;
  };

  const onChangeRoomIno = (data: TRoom) => {
    setRoomInfo(data);
  }

  const ShowGameArea = () => {
    if (!ws || !roomInfo) {
      return null;
    }

    if (roomInfo.status === 0) {
      return null;
    }

    const chineseChessData: TChineseChess[] = roomInfo.gameData.sort((a: TChineseChess, b: TChineseChess) => {
      return a.location > b.location ? 1 : -1
    });

    const gameList: any = {
      "象棋": <ChineseChess
                chineseChessData={chineseChessData}
                ws={ws}
                userID={userInfo.id}
                roomInfo={roomInfo}
                onChangeRoomIno={onChangeRoomIno}
              />,
    }
    return gameList[roomInfo.gameName];
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            {
              roomInfo && roomInfo.userList.map((user: TRoomUser) => {
                return <RoomUser key={user.id} user={user}/>
              })
            }
            <div>Back to list</div>
            {
              isMaster() ?
              <Button
                className="start"
                disabled={disabledStart()}
                onClick={startGame}
                title="Start"
              /> :
              <Button
                className="ready"
                onClick={readyGame}
                title="Ready"
              />
            }
          </div>
          <div className="col-md-9">
            <ShowGameArea />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Room;
