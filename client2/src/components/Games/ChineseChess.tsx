import React from 'react';
import '@styles/games/chineseChess.scss';
import ChessItem from './ChessItem';
import { TChineseChess } from '../../types/ChineseChess';
import { TRoom } from '../../types/Room';
import { TSocket } from '../../types/Socket';

type ChineseChessProps = {
  chineseChessData: TChineseChess[];
  userID: string;
  roomInfo: TRoom;
  ws: WebSocket;
  onChangeRoomIno: (r: TRoom) => void;
}

const ChineseChess = (props: ChineseChessProps) => {
  const {
    chineseChessData,
    userID,
    roomInfo,
    ws,
    onChangeRoomIno
  } = props;

  ws.onmessage = (websocket: MessageEvent) => {
    const wsData: TSocket = JSON.parse(websocket.data);
    if (!wsData) return;
    if (wsData.event === 'onFlip') {
      onChangeRoomIno(wsData.data.roomInfo)
    }
  }

  const onFlip = (id: number) => {
    // 判斷是否輪到你了
    if (userID !== roomInfo.nowTurn) {
      return;
    }

    const sendData = JSON.stringify({
      userID: userID,
      event: 'onFlip',
      data: {
        roomID: roomInfo.id,
        ChessID: id
      }
    })
    ws.send(sendData);
  }

  return (
    <div className="chinese-chess-container">
      {chineseChessData && chineseChessData.map(chessInfo =>
        <ChessItem
          key={chessInfo.id}
          chessInfo={chessInfo}
          onFlip={onFlip}
        />
      )}
    </div>
  )
}

export default ChineseChess;
