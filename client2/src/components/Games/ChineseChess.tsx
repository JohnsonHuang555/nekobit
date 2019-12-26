import React, { useState } from 'react';
import ChessItem from './ChessItem';
import { TChineseChess } from '../../types/ChineseChess';
import { TRoom } from '../../types/Room';
import { TSocket } from '../../types/Socket';
import '@styles/games/chineseChess.scss';

type ChineseChessProps = {
  chineseChessData: TChineseChess[];
  userID: string;
  roomInfo: TRoom;
  ws: WebSocket;
  onChangeRoomInfo: (r: TRoom) => void;
}

const ChineseChess = (props: ChineseChessProps) => {
  const [selectedChess, setSelectChess] = useState<TChineseChess>();
  const {
    chineseChessData,
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
    if (selectedChess && chess.isFliped) {
      onMove(selectedChess.id, chess.location);
      return;
    }

    if (chess.isFliped) {
      // select event
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

  const findChessByID = (id: number) => (
    chineseChessData.find(c => {
      return c.id === id;
    })
  );

  const onMove = (id: number, location: number) => {
    console.log(id, location)
  }

  const chessesList = chineseChessData.map(chessInfo => {
    let isSelected = false
    if (selectedChess && selectedChess.id === chessInfo.id) {
      isSelected = true;
    }
    return (
      <ChessItem
        key={chessInfo.id}
        chessInfo={chessInfo}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    )
  });

  return (
    <div className="chinese-chess-container">
      {chessesList}
    </div>
  )
}

export default ChineseChess;
