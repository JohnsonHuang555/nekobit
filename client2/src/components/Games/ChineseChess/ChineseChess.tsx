import React, { useState } from 'react';
import { TChineseChess } from 'src/types/ChineseChess';
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
      case 'onFlip':
      case 'onEat':
      case 'onMove':
      case 'gameOver':
        onChangeRoomInfo(wsData.data.roomInfo)
        break;
    }
  }

  // const onSelect = (id: number) => {
  //   // 判斷是否輪到你了
  //   if (userID !== roomInfo.nowTurn) {
  //     return;
  //   }

  //   let sendData = '';
  //   const chess = findChessByID(id);

  //   // 代表正在選取棋子
  //   // if (selectedChess && chess.isFliped && chess.id !== selectedChess.id) {
  //   //   onEat(selectedChess, chess);
  //   //   return;
  //   // }

  //   // if (chess.isFliped) {
  //   //   // select event
  //   //   const userInfo = findUserByID(userID);
  //   //   if (userInfo.side !== chess.side) {
  //   //     return;
  //   //   }

  //   //   if (selectedChess) {
  //   //     setSelectChess(undefined);
  //   //   } else {
  //   //     setSelectChess(chess);
  //   //   }
  //   // } else {
  //   //   // flip
  //   //   sendData = JSON.stringify({
  //   //     userID: userID,
  //   //     event: 'onFlip',
  //   //     data: {
  //   //       roomID: roomInfo.id,
  //   //       chessID: id
  //   //     }
  //   //   })
  //   //   ws.send(sendData);
  //   // }
  // }

  // const onEat = (nowChess: TChineseChess, targetChess: TChineseChess) => {
  //   if (nowChess.side === targetChess.side) {
  //     setSelectChess(targetChess);
  //     return;
  //   }

  //   // FIXME: refactor
  //   if (checkEatCondition(nowChess, targetChess)) {
  //     if (nowChess.name === '炮' || nowChess.name === '包') {
  //       // eat
  //       const sendData = JSON.stringify({
  //         userID: userID,
  //         event: 'onEat',
  //         data: {
  //           roomID: roomInfo.id,
  //           chessID: nowChess.id,
  //           newLocation: targetChess.location,
  //           eatenChessID: targetChess.id
  //         }
  //       });

  //       ws.send(sendData);
  //       setSelectChess(undefined);
  //     } else {
  //       if (isInRange(nowChess.location, targetChess.location)) {
  //         const sendData = JSON.stringify({
  //           userID: userID,
  //           event: 'onEat',
  //           data: {
  //             roomID: roomInfo.id,
  //             chessID: nowChess.id,
  //             newLocation: targetChess.location,
  //             eatenChessID: targetChess.id
  //           }
  //         });

  //         ws.send(sendData);
  //         setSelectChess(undefined);
  //       }
  //     }
  //   }
  // }

  // const onMove = (newLocation: number) => {
  //   // 判斷是否輪到你了
  //   if (userID !== roomInfo.nowTurn) {
  //     return;
  //   }

  //   if (!selectedChess || !isInRange(selectedChess.location, newLocation)) {
  //     return;
  //   }

  //   const sendData = JSON.stringify({
  //     userID: userID,
  //     event: 'onMove',
  //     data: {
  //       newLocation,
  //       chessID: selectedChess.id,
  //       roomID: roomInfo.id,
  //     }
  //   });

  //   ws.send(sendData);
  //   setSelectChess(undefined);
  // }

  // 判斷移動範圍
  // const isInRange = (nowLocation: number, targetLocation: number): boolean => {
  //   const range = [];
  //   // first line x - 8
  //   const firstLineMedian = nowLocation - 8;
  //   if (nowLocation > 8) {
  //     range.push(firstLineMedian);
  //   }
  //   // second line x
  //   const secondLineMedian = nowLocation;
  //   range.push(secondLineMedian - 1);
  //   range.push(secondLineMedian + 1);
  //   // third line x + 8
  //   const thirdLineMedian = nowLocation + 8;
  //   if (nowLocation + 8 < 32) {
  //     range.push(thirdLineMedian);
  //   }

  //   if (range.includes(targetLocation)) {
  //     return true;
  //   }
  //   return false;
  // }

  // const chessMapHiddenMode = () => {
  //   // 檢查是否遊戲結束
  //   const remainRedChesses = [...roomInfo.gameData].filter((g: TChineseChess) => {
  //     return g.location !== -1 && g.side === 'RED';
  //   });
  //   const remainBlackChesses = [...roomInfo.gameData].filter((g: TChineseChess) => {
  //     return g.location !== -1 && g.side === 'BLACK';
  //   });

  //   if (remainRedChesses.length === 0 || remainBlackChesses.length === 0) {
  //     const sendData = JSON.stringify({
  //       userID: userID,
  //       event: 'gameOver',
  //       data: {
  //         roomID: roomInfo.id,
  //       }
  //     });

  //     ws.send(sendData);
  //   }
  //   let map = [];
  //   for (let i = 0; i < 32; i++) {
  //     const chessInfo: TChineseChess = [...roomInfo.gameData].find((g: TChineseChess) => {
  //       return g.location === i + 1;
  //     })

  //     let isSelected = false
  //     if (chessInfo && selectedChess && selectedChess.id === chessInfo.id) {
  //       isSelected = true;
  //     }

  //     map.push(
  //       <ChessMapItem
  //         key={i}
  //         chessInfo={chessInfo ? chessInfo : undefined}
  //         isSelected={isSelected}
  //         onSelect={onSelect}
  //         onMove={() => onMove(i + 1)}
  //         mode={roomInfo.mode}
  //       />
  //     )
  //   }
  //   return map;
  // }

  // const chessMapStandardMode = () => {
  //   let map = []
  //   for (let i = 0; i < 90; i++) {
  //     const chessInfo: TChineseChess = [...roomInfo.gameData].find((g: TChineseChess) => {
  //       return g.location === i + 1;
  //     });

  //     let isSelected = false
  //     if (chessInfo && selectedChess && selectedChess.id === chessInfo.id) {
  //       isSelected = true;
  //     }

  //     map.push(
  //       <ChessMapItem
  //         key={i}
  //         chessInfo={chessInfo ? chessInfo : undefined}
  //         isSelected={isSelected}
  //         onSelect={onSelect}
  //         onMove={() => {}}
  //         mode={roomInfo.mode}
  //       />
  //     )
  //   }
  //   return map;
  // }

  const onSelect = (id: number) => {
    const chess = findChessByID(id);
    // 判斷是否輪到你了
    if (userID !== roomInfo.nowTurn || !chess) {
      return;
    }
    setSelectChess(chess);
  }

  const onMove = (data: any) => {
    onWsSend('onMove', data);
  }

  const onEat = (data: any) => {
    onWsSend('onEat', data);
  }

  const onFlip = (id: number) => {
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
          selectedChess={selectedChess}
          onClearSelectedChess={onClearSelectedChess}
          onSelect={onSelect}
          onMove={onMove}
          onEat={onEat}
          onGameOver={onGameOver}
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
        />
  }

  return (
    <div className="chinese-chess-container">
      {renderMode[roomInfo.mode]}
    </div>
  )
}

export default ChineseChess;
