import React, { useState } from 'react';
import { TChineseChess, GameModeCode } from 'src/types/ChineseChess';
import { TRoom, TRoomUser } from 'src/types/Room';
import { TSocket } from 'src/types/Socket';
import Standard from 'src/components/Games/ChineseChess/Mode/Standard';
import Hidden from 'src/components/Games/ChineseChess/Mode/Hidden';
import '@styles/games/chineseChess.scss';

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
    onChangeRoomInfo,
  } = props;

  const onWsSend = (event: string, dt: any) => {
    const sendData = JSON.stringify({
      event,
      userID,
      data: {
        ...dt,
        roomID: roomInfo.id,
      },
    });

    ws.send(sendData);
  }

  ws.onmessage = (websocket: MessageEvent) => {
    const wsData: TSocket = JSON.parse(websocket.data);
    if (!wsData) return;
    switch (wsData.event) {
      // case 'onFlip':
      // case 'onEat':
      // case 'onEatStandard':
      // case 'onMove':
      // case 'onMoveStandard':
      // case 'gameOver':
      default:
        onChangeRoomInfo(wsData.data.roomInfo)
        break;
    }
  }

  const onSelect = (id: number) => {
    const chess = findChessByID(id);
    const userInfo = findUserByID(userID);
    // 判斷是否輪到你了
    if (userID !== roomInfo.nowTurn || !chess || userInfo.side !== chess.side) {
      return;
    }
    setSelectChess(chess);
  }

  const onMove = (data: any) => {
    if (userID !== roomInfo.nowTurn) {
      return;
    }

    onWsSend('onMove', data);
  }

  const onMoveStandard = (data: any) => {
    if (userID !== roomInfo.nowTurn) {
      return;
    }

    onWsSend('onMoveStandard', data);
  }

  const onEat = (data: any) => {
    onWsSend('onEat', data);
  }

  const onEatStandard = (data: any) => {
    onWsSend('onEatStandard', data);
  }

  const onFlip = (id: number) => {
    if (userID !== roomInfo.nowTurn) {
      return;
    }
    onWsSend('onFlip', {
      chessID: id,
    });
  }

  const onClearSelectedChess = () => {
    setSelectChess(undefined);
  }

  const onGameOver = () => {
    onWsSend('gameOver', {});
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

  const renderMode: any = {
    1: <Standard
          gameData={roomInfo.gameData}
          mode={roomInfo.mode}
          selectedChess={selectedChess}
          onClearSelectedChess={onClearSelectedChess}
          onSelect={onSelect}
          onMove={onMoveStandard}
          onEat={onEatStandard}
          onGameOver={onGameOver}
          isRotate={findUserByID(userID).side === 'BLACK' && true}
          isYouTurn={userID !== roomInfo.nowTurn && true}
        />,
    2: <Hidden
          gameData={roomInfo.gameData}
          selectedChess={selectedChess}
          onClearSelectedChess={onClearSelectedChess}
          onFlip={onFlip}
          onSelect={onSelect}
          onMove={onMove}
          onEat={onEat}
          onGameOver={onGameOver}
          yourSide={findUserByID(userID).side}
          isYouTurn={userID === roomInfo.nowTurn && true}
        />
  }

  return (
    <div
      className={`chinese-chess-container ` +
        (roomInfo.mode === GameModeCode.Standard && findUserByID(userID).side === 'BLACK' && 'rotate')}
    >
      {renderMode[roomInfo.mode]}
    </div>
  )
}

export default ChineseChess;
