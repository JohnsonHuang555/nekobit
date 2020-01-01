import React, { useState } from 'react';
import { TChineseChess } from 'src/types/ChineseChess';
import { TRoom, TRoomUser } from 'src/types/Room';
import { TSocket } from 'src/types/Socket';
import ChessMapItem from './ChessMapItem';
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
    onChangeRoomInfo
  } = props;

  ws.onmessage = (websocket: MessageEvent) => {
    const wsData: TSocket = JSON.parse(websocket.data);
    if (!wsData) return;
    switch (wsData.event) {
      case 'onFlip':
      case 'onEat':
      case 'onMove':
        onChangeRoomInfo(wsData.data.roomInfo)
        break;
    }
  }

  const onSelect = (id: number) => {
    // 判斷是否輪到你了
    if (userID !== roomInfo.nowTurn) {
      return;
    }

    let sendData = '';
    const chess = findChessByID(id);

    // 代表正在選取棋子
    if (selectedChess && chess.isFliped && chess.id !== selectedChess.id) {
      onEat(selectedChess, chess);
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
          chessID: id
        }
      })
      ws.send(sendData);
    }
  }

  const onEat = (nowChess: TChineseChess, targetChess: TChineseChess) => {
    if (nowChess.side === targetChess.side) {
      setSelectChess(targetChess);
      return;
    }

    if (checkEatCondition(nowChess, targetChess)) {
      if (nowChess.name === '炮' || nowChess.name === '包') {
        // eat
        const sendData = JSON.stringify({
          userID: userID,
          event: 'onEat',
          data: {
            roomID: roomInfo.id,
            chessID: nowChess.id,
            newLocation: targetChess.location,
            eatenChessID: targetChess.id
          }
        });

        ws.send(sendData);
        setSelectChess(undefined)
      } else {
        if (isInRange(nowChess.location, targetChess.location)) {
          const sendData = JSON.stringify({
            userID: userID,
            event: 'onEat',
            data: {
              roomID: roomInfo.id,
              chessID: nowChess.id,
              newLocation: targetChess.location,
              eatenChessID: targetChess.id
            }
          });

          ws.send(sendData);
          setSelectChess(undefined)
        }
      }
    }
  }

  // 判斷階級條件
  const checkEatCondition = (nowChess: TChineseChess, targetChess: TChineseChess): boolean => {
    // 卒吃帥
    if (nowChess.name === '卒' || nowChess.name === '兵') {
      if (targetChess.name === '帥' || targetChess.name === '將') {
        return true;
      }
    }

    // 帥不能吃卒
    if (nowChess.name === '帥' || nowChess.name === '將') {
      if (targetChess.name === '卒' || targetChess.name === '兵') {
        return false;
      }
    }

    if (nowChess.name === '炮' || nowChess.name === '包') {
      // 判斷小於8是 X 軸
      const isXAxis = Math.abs(targetChess.location - nowChess.location) < 8 ? true : false;
      if (isXAxis) {
        // X axis
        if (nowChess.location > targetChess.location) {
          const chess = [...roomInfo.gameData].filter((c: TChineseChess) => {
            return c.location < nowChess.location && c.location > targetChess.location
          })
          return chess.length === 1 ? true : false;
        } else {
          const chess = [...roomInfo.gameData].filter((c: TChineseChess) => {
            return c.location > nowChess.location && c.location < targetChess.location
          })
          return chess.length === 1 ? true : false;
        }
      } else {
        // Y axis
        if (nowChess.location > targetChess.location) {
          const temp = [];
          for (let i = targetChess.location + 8; i < nowChess.location; i=i+8) {
            if ((roomInfo.gameData[i + 1] as TChineseChess).location !== -1) {
              temp.push(i)
            }
          }
          return temp.length === 1 ? true : false;
        } else {
          const temp = [];
          for (let i = nowChess.location + 8; i < targetChess.location; i=i+8) {
            if ((roomInfo.gameData[i + 1] as TChineseChess).location !== -1) {
              temp.push(i)
            }
          }
          return temp.length === 1 ? true : false;
        }
      }
    }

    if (nowChess.rank >= targetChess.rank) {
      return true;
    }
    return false;
  }

  const onMove = (newLocation: number) => {
    // 判斷是否輪到你了
    if (userID !== roomInfo.nowTurn) {
      return;
    }

    if (!selectedChess || !isInRange(selectedChess.location, newLocation)) {
      return;
    }

    const sendData = JSON.stringify({
      userID: userID,
      event: 'onMove',
      data: {
        newLocation,
        chessID: selectedChess.id,
        roomID: roomInfo.id,
      }
    });

    ws.send(sendData);
    setSelectChess(undefined)
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

  // 判斷移動範圍
  const isInRange = (nowLocation: number, targetLocation: number): boolean => {
    const range = [];
    // 取每一行的中位數
    // first line x % 8
    const firstLineMedian = nowLocation - 8;
    if (nowLocation > 8) {
      range.push(firstLineMedian);
    }
    // second line x
    const secondLineMedian = nowLocation;
    range.push(secondLineMedian - 1);
    range.push(secondLineMedian + 1);
    // third line x + 8
    const thirdLineMedian = nowLocation + 8;
    if (nowLocation + 8 < 32) {
      range.push(thirdLineMedian);
    }
    console.log(range, nowLocation)

    if (range.includes(targetLocation)) {
      return true;
    }
    return false;
  }

  const chessMap = () => {
    let map = [];
    for (let i = 0; i < 32; i++) {
      const chessInfo: TChineseChess = [...roomInfo.gameData].find((g: TChineseChess) => {
        return g.location === i + 1;
      })

      let isSelected = false
      if (chessInfo && selectedChess && selectedChess.id === chessInfo.id) {
        isSelected = true;
      }

      map.push(
        <ChessMapItem
          key={i}
          chessInfo={chessInfo ? chessInfo : undefined}
          isSelected={isSelected}
          onSelect={onSelect}
          onMove={() => onMove(i + 1)}
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
