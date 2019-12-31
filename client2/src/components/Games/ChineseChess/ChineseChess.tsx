import React, { useState } from 'react';
import { TChineseChess } from 'src/types/ChineseChess';
import { TRoom, TRoomUser } from 'src/types/Room';
import { TSocket } from 'src/types/Socket';
import '@styles/games/chineseChess.scss';
import ChessMapItem from './ChessMapItem';

type ChineseChessProps = {
  userID: string;
  roomInfo: TRoom;
  ws: WebSocket;
  onChangeRoomInfo: (r: TRoom) => void;
}

const ChineseChess = (props: ChineseChessProps) => {
  const [selectedChess, setSelectChess] = useState<TChineseChess>();
  const {
    userID,
    roomInfo,
    ws,
    onChangeRoomInfo
  } = props;

  ws.onmessage = (websocket: MessageEvent) => {
    const wsData: TSocket = JSON.parse(websocket.data);
    if (!wsData) return;
    if (wsData.event === 'onFlip') {
      onChangeRoomInfo(wsData.data.roomInfo)
    }
  }

  const onSelect = (id: number) => {
    // 判斷是否輪到你了
    if (userID !== roomInfo.nowTurn) {
      return;
    }

    let sendData = '';
    const chess = findChessByID(id);
    if (!chess) {
      return;
    }

    // 代表正在選取棋子
    if (selectedChess && chess.isFliped && chess.id !== selectedChess.id) {
      onMove(selectedChess, chess);
      return;
    }

    if (chess.isFliped) {
      // select event
      const userInfo = findUserByID(userID);
      if (userInfo.side !== chess.side) {
        return;
      }

      if (selectedChess) {
        setSelectChess(undefined)
      } else {
        setSelectChess(chess);
      }
    } else {
      // flip
      sendData = JSON.stringify({
        userID: userID,
        event: 'onFlip',
        data: {
          roomID: roomInfo.id,
          ChessID: id
        }
      })
      ws.send(sendData);
    }
  }

  const onMove = (nowChess: TChineseChess, targetChess: TChineseChess) => {
    if (nowChess.side === targetChess.side) {
      setSelectChess(targetChess);
      return;
    }
  }

  const findChessByID = (id: number) => (
    roomInfo.gameData.find((c: any) => {
      return c.id === id;
    }) as TChineseChess
  );

  const findUserByID = (id: string) => (
    roomInfo.userList.find(u => {
      return u.id === id;
    }) as TRoomUser
  );

  const chessMap = () => {
    let map = [];
    const gameData = [...roomInfo.gameData] as TChineseChess[];
    for (let i = 0; i < 32; i++) {
      let chessIndex = gameData[i].location - 1
      let isSelected = false
      if (selectedChess && selectedChess.id === roomInfo.gameData[chessIndex].id) {
        isSelected = true;
      }
      map.push(
        <ChessMapItem
          key={i}
          chessInfo={gameData[chessIndex]}
          onSelect={onSelect}
          isSelected={isSelected}
        />
      )
    }
    return map;
  }

  return (
    <div className="chinese-chess-container">
      {chessMap()}
    </div>
  )
}

export default ChineseChess;
