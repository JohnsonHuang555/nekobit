import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { ActionType as AppActionType } from 'src/reducers/appReducer';
import { ActionType as RoomActionType } from 'src/features/main/reducers/roomReducer';
import { roomWebsocketSelector, userInfoSelector } from 'src/selectors';
import { TSocket, SocketEvent } from 'src/types/Socket';
import { roomInfoSelector, playerSideSelector, isYouMasterSelector } from 'src/features/main/selectors';
import { TChineseChess, ChessSide, GameModeCode, ChessName } from '../domain/models/ChineseChess';
import { CheckMoveRange, TRange } from '../helpers/CheckMoveRange';
import { UserFactory } from 'src/features/main/domain/factories/UserFactory';
import { ChineseChessFactory } from '../domain/factories/ChineseChessFactory';
import { RoomFactory } from 'src/features/main/domain/factories/RoomFactory';
import Hidden from './components/Mode/Hidden';
import Standard from './components/Mode/Standard';
import styles from '@styles/games/chineseChess.module.scss';

const ChineseChessContainer = () => {
  const dispatch = useDispatch();
  const ws = useSelector(roomWebsocketSelector);
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
            if (roomInfo.mode === GameModeCode.Standard && isYouMaster) {
              const user = roomInfo.userList.find(u => u.playOrder === 0);
              if (user) {
                dispatch({
                  type: AppActionType.SEND_MESSAGE_ROOM,
                  event: SocketEvent.SetSideBlack,
                  userId: user.id
                });
              }
            }
            break;
          }
          case SocketEvent.SetSideBlack: {
            const userList = UserFactory.createArrayFromNet(wsData.data.roomUserList);
            dispatch({
              type: RoomActionType.UPDATE_ROOM_INFO,
              roomInfo: {
                userList,
              }
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
                type: AppActionType.SET_ALERT_MODAL,
                show: true,
                message: playerSide === ChessSide.Black ? '你贏了' : '你輸了',
              })
              return;
            }

            if (!blackAliveChesses.length) {
              dispatch({
                type: AppActionType.SET_ALERT_MODAL,
                show: true,
                message: playerSide === ChessSide.Red ? '你贏了' : '你輸了',
              })
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
    console.log(chess)
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
        let canMove = false;
        switch (selectedChess.name) {
          case ChessName.KingBlack: {
            // 限制範圍
            if (targetY > 3) { return; }
            const range = CheckMoveRange.shortCross(selectedChess.locationX, selectedChess.locationY);
            canMove = CheckMoveRange.isInRange(range, targetX, targetY);
            break;
          }
          case ChessName.KingRed:{
            if (targetY < 8) { return; }
            const range = CheckMoveRange.shortCross(selectedChess.locationX, selectedChess.locationY);
            canMove = CheckMoveRange.isInRange(range, targetX, targetY);
            break;
          }
          case ChessName.SoldiersBlack: {
            const range: TRange[] = [];
            range.push({
              x: selectedChess.locationX,
              y: selectedChess.locationY + 1
            });
            if (targetY > 5) {
              // 可左右移動
              range.push({x: selectedChess.locationX + 1, y: selectedChess.locationY});
              range.push({x: selectedChess.locationX - 1, y: selectedChess.locationY});
            }
            canMove = CheckMoveRange.isInRange(range, targetX, targetY);
            break;
          }
          case ChessName.SoldiersRed: {
            const range: TRange[] = [];
            range.push({
              x: selectedChess.locationX,
              y: selectedChess.locationY - 1
            });
            if (targetY < 6) {
              // 可左右移動
              range.push({x: selectedChess.locationX + 1, y: selectedChess.locationY});
              range.push({x: selectedChess.locationX - 1, y: selectedChess.locationY});
            }
            canMove = CheckMoveRange.isInRange(range, targetX, targetY);
            break;
          }
          case ChessName.ChariotsBlack:
          case ChessName.ChariotsRed:
          case ChessName.CannonsBlack:
          case ChessName.CannonsRed: {
            if (selectedChess.locationX === targetX) {
              for (let i = 0; i < Math.abs(selectedChess.locationY - targetY) - 1; i++) {
                let hasChessY = false;
                if (targetY > selectedChess.locationY) {
                  hasChessY = findChessByLocation(targetX, selectedChess.locationY + i);
                } else {
                  hasChessY = findChessByLocation(targetX, targetY + i);
                }
                if (hasChessY) {
                  canMove = false;
                  break;
                }
              }
            }
            if (selectedChess.locationY === targetY) {
              for (let i = 0; i < Math.abs(selectedChess.locationX - targetX) - 1; i++) {
                let hasChessX = false;
                if (targetX > selectedChess.locationX) {
                  hasChessX = findChessByLocation(selectedChess.locationX + i, targetY);
                } else {
                  hasChessX = findChessByLocation(targetX + i, targetY);
                }
                if (hasChessX) {
                  canMove = false;
                  break;
                }
              }
            }
          }
          case ChessName.HorsesBlack:
          case ChessName.HorsesRed: {
            const range: TRange[] = [];
            ['xAdd', 'xMinus', 'yAdd', 'yMinus'].forEach(item => {
              switch (item) {
                case 'xAdd':
                  // 拐馬腳
                  const xAddObstacle = findChessByLocation(selectedChess.locationX + 1, selectedChess.locationY);
                  if (xAddObstacle) break;
                  const xAdd = selectedChess.locationX + 2;
                  range.push({x: xAdd, y: selectedChess.locationY + 1});
                  range.push({x: xAdd, y: selectedChess.locationY - 1});
                  break;
                case 'xMinus':
                  const xMinusObstacle = findChessByLocation(selectedChess.locationX - 1, selectedChess.locationY);
                  if (xMinusObstacle) break;
                  const xMinus = selectedChess.locationX - 2;
                  range.push({x: xMinus, y: selectedChess.locationY + 1});
                  range.push({x: xMinus, y: selectedChess.locationY - 1});
                  break;
                case 'yAdd':
                  const yAddObstacle = findChessByLocation(selectedChess.locationX, selectedChess.locationY + 1);
                  if (yAddObstacle) break;
                  const yAdd = selectedChess.locationY + 2;
                  range.push({x: selectedChess.locationX + 1, y: yAdd});
                  range.push({x: selectedChess.locationX - 1, y: yAdd});
                  break;
                case 'yMinus':
                  const yMinusObstacle = findChessByLocation(selectedChess.locationX, selectedChess.locationY - 1);
                  if (yMinusObstacle) break;
                  const yMinus = selectedChess.locationY - 2;
                  range.push({x: selectedChess.locationX + 1, y: yMinus});
                  range.push({x: selectedChess.locationX - 1, y: yMinus});
                  break;
              }
            });
            canMove = CheckMoveRange.isInRange(range, targetX, targetY);
            break;
          }
          case ChessName.MinisterBlack:
          case ChessName.MinisterRed: {
            const range: TRange[] = [];
            // 不可過河
            if (selectedChess.name === '象' && selectedChess.locationY > 5) {
              canMove = false;
              break;
            }
            if (selectedChess.name === '相' && selectedChess.locationY < 6) {
              canMove = false;
              break;
            }
            ['left', 'right'].forEach(item => {
              switch (item) {
                case 'left':
                  const topLeftObstacle = findChessByLocation(selectedChess.locationX - 1, selectedChess.locationY - 1);
                  const bottomLeftObstacle = findChessByLocation(selectedChess.locationX - 1, selectedChess.locationY + 1);
                  const leftX = selectedChess.locationX - 2;
                  if (!topLeftObstacle) {
                    range.push({x: leftX, y: selectedChess.locationY - 2});
                  }
                  if (!bottomLeftObstacle) {
                    range.push({x: leftX, y: selectedChess.locationY + 2});
                  }
                  break;
                case 'right':
                  const topRightObstacle = findChessByLocation(selectedChess.locationX + 1, selectedChess.locationY - 1);
                  const bottomRightObstacle = findChessByLocation(selectedChess.locationX + 1, selectedChess.locationY + 1);
                  const rightX = selectedChess.locationX + 2;
                  if (!topRightObstacle) {
                    range.push({x: rightX, y: selectedChess.locationY - 2});
                  }
                  if (!bottomRightObstacle) {
                    range.push({x: rightX, y: selectedChess.locationY + 2});
                  }
                  break;
              }
            });
            canMove = CheckMoveRange.isInRange(range, targetX, targetY);
            break;
          }
          case ChessName.GuardsBlack:
          case ChessName.GuardsRed: {
            if (targetX > 6 || targetX < 4) {
              canMove = false;
              break;
            }
            if (selectedChess.name === '士' && targetY > 3) {
              canMove = false;
              break;
            } else if (selectedChess.name === '仕' && targetY < 8) {
              canMove = false;
              break;
            }

            const range = CheckMoveRange.diagonal(selectedChess.locationX, selectedChess.locationY);
            canMove = CheckMoveRange.isInRange(range, targetX, targetY);
            break;
          }
        }
        if (canMove) {
          dispatch({
            type: AppActionType.SEND_MESSAGE_ROOM,
            event: SocketEvent.MoveChess,
            data: {
              chessID: selectedChess.id,
              locationX: targetX,
              locationY: targetY,
            }
          });
        }
      }
      case GameModeCode.Hidden: {
        const range = CheckMoveRange.shortCross(selectedChess.locationX, selectedChess.locationY);
        const isInRange = CheckMoveRange.isInRange(range, targetX, targetY);
        if (isInRange) {
          dispatch({
            type: AppActionType.SEND_MESSAGE_ROOM,
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
      type: AppActionType.SEND_MESSAGE_ROOM,
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
              type: AppActionType.SEND_MESSAGE_ROOM,
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

  const findChessByLocation = (x: number, y:number): boolean => {
    return roomInfo.gameData.find((chess: TChineseChess) => (
      chess.locationX === x && chess.locationY === y
    ));
  }

  const renderMode = () => {
    switch (roomInfo.mode) {
      case 1: {
        return (
          <Standard
            chesses={roomInfo.gameData as TChineseChess[]}
            selectedChess={selectedChess}
            playerSide={playerSide as ChessSide}
            onSelect={(chess) => onSelect(chess)}
            onMove={(tX, tY) => onMove(tX, tY, GameModeCode.Standard)}
            onEat={(tc) => onEat(tc, GameModeCode.Standard)}
            yourTurn={yourTurn}
          />
        )
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
              type: AppActionType.SEND_MESSAGE_ROOM,
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
