import React from 'react';
import { TChineseChess } from '../../types/ChineseChess';
import { TRoom } from '../../types/Room';
import ChineseChess from './ChineseChess';

type GameAreaProps = {
  roomInfo: TRoom;
  websocket: WebSocket;
}

const GameArea = (props: GameAreaProps) => {
  const {
    roomInfo,
    websocket,
  } = props;

  websocket.onmessage = (data) => {
    console.log(data)
  }

  const onFlip = () => {

  }

  const sortData: TChineseChess[] = roomInfo.gameData &&
    roomInfo.gameData.sort((a: TChineseChess, b:TChineseChess) => {
    return a.location > b.location ? 1 : -1
  });

  const GameList: any = {
    "象棋": <ChineseChess chineseChessData={sortData} onFlip={onFlip}/>,
  }

  return (
    <div className="game-area">
      {GameList[roomInfo.gameName]}
    </div>
  )
}

export default GameArea;
