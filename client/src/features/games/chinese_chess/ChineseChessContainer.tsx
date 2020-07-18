import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { ActionType as AppActionType } from 'src/reducers/appReducer';
import { ActionType as RoomActionType } from 'src/features/main/reducers/roomReducer';
import { websocketSelector, userInfoSelector } from 'src/selectors';
import { TSocket, SocketEvent } from 'src/types/Socket';
import { roomInfoSelector, playerSideSelector, isYouMasterSelector } from 'src/features/main/selectors';
import { TChineseChess, ChessSide, GameModeCode, ChessName } from '../domain/models/ChineseChess';
import { CheckMoveRange } from '../helpers/CheckMoveRange';
import { UserFactory } from 'src/features/main/domain/factories/UserFactory';
import { ChineseChessFactory } from '../domain/factories/ChineseChessFactory';
import { RoomFactory } from 'src/features/main/domain/factories/RoomFactory';
import Hidden from './components/Mode/Hidden';
import styles from '@styles/games/chineseChess.module.scss';

const ChineseChessContainer = () => {
  const dispatch = useDispatch();
  const ws = useSelector(websocketSelector);
  const roomInfo = useSelector(roomInfoSelector);
  const playerSide = useSelector(playerSideSelector);
  const isYouMaster = useSelector(isYouMasterSelector);
  const userInfo = useSelector(userInfoSelector);

  const [selectedChess, setSelectedChess] = useState<TChineseChess>();

  useEffect(() => {
    if (ws) {
      ws.onmessage = (webSocket: MessageEvent) => {
        const wsData: TSocket = JSON.parse(webSocket.data);
        switch (wsData.event) {
          case SocketEvent.SetPlayOrder: {
            const roomInfo = RoomFactory.createFromNet(wsData.data.roomInfo);
            dispatch({
              type: RoomActionType.UPDATE_ROOM_INFO,
              roomInfo,
            });
            break;
          }
          case SocketEvent.FlipChess: {
            const userList = UserFactory.createArrayFromNet(wsData.data.roomUserList);
            const nowTurn = wsData.data.nowTurn || '';
            const gameData = ChineseChessFactory.createArrayFromNet(wsData.data.gameData || []);
            dispatch({
              type: RoomActionType.UPDATE_ROOM_INFO,
              roomInfo: {
                nowTurn,
                userList,
                gameData,
              }
            });
            break;
          }
          case SocketEvent.MoveChess:
          case SocketEvent.EatChess: {
            const gameData = ChineseChessFactory.createArrayFromNet(wsData.data.gameData || []);
            const nowTurn = wsData.data.nowTurn || '';

            const redAliveChesses = gameData.filter(c => c.alive && c.side === ChessSide.Red);
            const blackAliveChesses = gameData.filter(c => c.alive && c.side === ChessSide.Black);
            if (!redAliveChesses.length) {
              dispatch({
                type: RoomActionType.GAME_OVER,
                gameOver: {
                  isGameOver: true,
                  winner: ChessSide.Black,
                }
              });
              return;
            }

            if (!blackAliveChesses.length) {
              dispatch({
                type: RoomActionType.GAME_OVER,
                gameOver: {
                  isGameOver: true,
                  winner: ChessSide.Red,
                }
              });
              return;
            }

            setSelectedChess(undefined);
            dispatch({
              type: RoomActionType.UPDATE_ROOM_INFO,
              roomInfo: {
                gameData,
                nowTurn,
              }
            });
            break;
          }
        }
      };
    }
  }, [ws]);

  if (!roomInfo || !userInfo) { return null; }

  const yourTurn = roomInfo.nowTurn && userInfo.id === roomInfo.nowTurn ? true : false;

  // methods
  const onSelect = (chess: TChineseChess) => {
    if (selectedChess?.id === chess.id) {
      setSelectedChess(undefined);
      return;
    }
    setSelectedChess(chess);
  };

  const onMove = (targetX: number, targetY: number, gameMode: GameModeCode) => {
    if (!selectedChess) { return; }

    switch (gameMode) {
      case GameModeCode.Standard: {
        // TODO:
      }
      case GameModeCode.Hidden: {
        const range = CheckMoveRange.shortCross(selectedChess.locationX, selectedChess.locationY);
        const isInRange = CheckMoveRange.isInRange(range, targetX, targetY);
        if (isInRange) {
          dispatch({
            type: AppActionType.SEND_MESSAGE,
            event: SocketEvent.MoveChess,
            data: {
              chessID: selectedChess.id,
              locationX: targetX,
              locationY: targetY,
            }
          });
        }
      }
    }
  };

  const onFlip = (id: number) => {
    dispatch({
      type: AppActionType.SEND_MESSAGE,
      event: SocketEvent.FlipChess,
      data: {
        chessID: id,
      }
    });
    setSelectedChess(undefined);
  };

  const onEat = (targetChess: TChineseChess, gameMode: GameModeCode) => {
    if (!targetChess || !selectedChess) { return; }
    const chesses: TChineseChess[] = roomInfo.gameData;

    // 炮 要判斷中間是否隔一個
    if (selectedChess.name === ChessName.CannonsBlack || selectedChess.name === ChessName.CannonsRed) {
      if (selectedChess.locationX === targetChess.locationX) {
        const middelChesses = chesses.filter(c => {
          return c.locationX === targetChess.locationX &&
                 c.locationY > Math.min(targetChess.locationY, selectedChess.locationY) &&
                 c.locationY < Math.max(targetChess.locationY, selectedChess.locationY) &&
                 c.alive
        });
        if (middelChesses.length !== 1) {
          return;
        }
      }
      if (selectedChess.locationY === targetChess.locationY) {
        const middelChesses = chesses.filter(c => {
          return c.locationY === targetChess.locationY &&
                 c.locationX > Math.min(targetChess.locationX, selectedChess.locationX) &&
                 c.locationX < Math.max(targetChess.locationX, selectedChess.locationX) &&
                 c.alive
        });
        if (middelChesses.length !== 1) {
          return;
        }
      }
    }

    switch (gameMode) {
      case GameModeCode.Standard: {
        // TODO:
      }
      case GameModeCode.Hidden: {
        const range = CheckMoveRange.shortCross(selectedChess.locationX, selectedChess.locationY);
        const isInRange = CheckMoveRange.isInRange(range, targetChess.locationX, targetChess.locationY);
        if (isInRange || selectedChess.name === ChessName.CannonsBlack || selectedChess.name === ChessName.CannonsRed) {
          if (isEatable(targetChess)) {
            dispatch({
              type: AppActionType.SEND_MESSAGE,
              event: SocketEvent.EatChess,
              data: {
                chessID: selectedChess.id,
                targetID: targetChess.id,
              }
            });
          }
        }
      }
    }
  };

  const isEatable = (targetChess: TChineseChess): boolean => {
    if (!targetChess || !selectedChess) { return false; }
    if (selectedChess.name === ChessName.CannonsBlack || selectedChess.name === ChessName.CannonsRed) {
      // 包則不用判斷階級
      return true;
    } else if (
      (selectedChess.name === ChessName.SoldiersBlack || selectedChess.name === ChessName.SoldiersRed) &&
      (targetChess.name === ChessName.KingBlack || targetChess.name === ChessName.KingRed)
    ) {
      // 卒可以吃帥，兵可以吃將
      return true;
    } else if (
      (selectedChess.name === ChessName.KingBlack || selectedChess.name === ChessName.KingRed) &&
      (targetChess.name === ChessName.SoldiersBlack || targetChess.name === ChessName.SoldiersRed)
    ) {
      // 帥不可以吃卒，將不可以吃兵
      return false;
    } else if (
      (selectedChess.name === ChessName.SoldiersBlack || selectedChess.name === ChessName.SoldiersRed) &&
      (targetChess.name === ChessName.CannonsBlack || targetChess.name === ChessName.CannonsRed)
    ) {
      // 卒不可以吃炮，兵不可以吃包
      return false;
    } else {
      // 其餘則以階級判斷
      if (selectedChess.rank >= targetChess.rank) {
        return true
      }
      return false
    }
  }

  const renderMode = () => {
    switch (roomInfo.mode) {
      case 1: {

      }
      case 2: {
        return (
          <Hidden
            chesses={roomInfo.gameData as TChineseChess[]}
            selectedChess={selectedChess}
            playerSide={playerSide as ChessSide}
            onSelect={(chess) => onSelect(chess)}
            onFlip={(id) => onFlip(id)}
            onMove={(tX, tY) => onMove(tX, tY, GameModeCode.Hidden)}
            onEat={(tc) => onEat(tc, GameModeCode.Hidden)}
            yourTurn={yourTurn}
          />
        )
      }
      default: {
        <Box>Game not found. Please report bug...</Box>
      }
    }
  }

  return (
    <>
      <Box className={styles.header}>
        {!roomInfo.nowTurn && isYouMaster && (
          <Button
            color="primary"
            size="large"
            variant="contained"
            onClick={() => dispatch({
              type: AppActionType.SEND_MESSAGE,
              event: SocketEvent.SetPlayOrder,
            })}
          >
            決定順序
          </Button>
        )}
        {yourTurn && (
          <Box>你的回合</Box>
        )}
        <Box>{playerSide}</Box>
      </Box>
      <Box>
        {renderMode}
      </Box>
    </>
  );
};

export default ChineseChessContainer;
