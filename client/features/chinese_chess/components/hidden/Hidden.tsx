import React from "react";
import GameMap from "./HiddenMap";
import styles from 'styles/features/hidden.module.scss';
import { Room } from "domain/models/Room";
import { PlayerSide } from "features/chinese_chess/domain/models/PlayerSide";
import { ChessSide, ChineseChess } from "features/chinese_chess/domain/models/ChineseChess";
import { useDispatch } from "react-redux";
import { setCanEat, setCanMove } from "features/chinese_chess/slices/chineseChessSlice";
import { wsSendMessage } from "actions/socketAction";
import { ChineseChessSocketEvent } from "domain/models/WebSocket";
import Icon, { IconType } from "components/Icon";
import { User } from "domain/models/User";

export type HiddenProps = {
  room: Room;
  playerSide: PlayerSide;
  isYourTurn: boolean;
  chineseChess: ChineseChess[];
  yourSide: ChessSide;
  userInfo: User;
  playersId: string[];
  selectedChess?: ChineseChess;
  onSelectChess: (c?: ChineseChess) => void;
}

const Hidden = (props: HiddenProps) => {
  const {
    room,
    playerSide,
    isYourTurn,
    chineseChess,
    yourSide,
    userInfo,
    playersId,
    selectedChess,
    onSelectChess,
  } = props;
  const dispatch = useDispatch();

  const chessMap = () => {
    let map = [];
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 8; x++) {
        const targetChess = chineseChess.find(c => {
          return c.locationX === x && c.locationY === y && c.alive;
        });

        const onMapClick = () => {
          if (selectedChess) {
            dispatch(setCanMove({
              chessId: selectedChess.id,
              targetX: x,
              targetY: y,
              chesses: chineseChess,
              mode: 'hidden',
            }))
          }
        };

        // FIXME: 抽出來
        const onChessClick = () => {
          if (!targetChess || !isYourTurn) { return; }
          if (yourSide === targetChess.side) {
            onSelectChess(targetChess);
          } else if (selectedChess && selectedChess.side !== targetChess.side) {
            // eat chess
            dispatch(setCanEat({
              chessId: selectedChess.id,
              targeId: targetChess.id, // FIXME: 打包
              targetName: targetChess.name,
              targetRank: targetChess.rank,
              targetX: targetChess.locationX,
              targetY: targetChess.locationY,
              chesses: chineseChess,
            }))
          }
        };

        const onFlip = (c: ChineseChess) => {
          if (!targetChess || !isYourTurn) { return; }
          dispatch(wsSendMessage({
            event: ChineseChessSocketEvent.FlipChess,
            player_id: userInfo.id,
            data: {
              chess_id: c.id,
              chinese_chess_side: c.side,
              players_id: playersId,
            }
          }));
          onSelectChess(undefined);
        };

        if (targetChess) {
          map.push(
            <div className={styles.itemContainer} key={`x-${x}/y-${y}`}>
              {targetChess.isFliped ?
                (
                  <span
                    className={`${styles.flipedChess} ${targetChess.side === ChessSide.Black ? styles.black : styles.red} ${selectedChess?.id === targetChess.id ? styles.selectedChess : ''}`}
                    onClick={() => onChessClick()}
                  >
                    <span>{targetChess.name}</span>
                    <span className={`${styles.circle} ${targetChess.side === ChessSide.Red ? styles.red : ''}`}></span>
                  </span>
                ) : (
                  <span
                    className={styles.notFlipedChess}
                    onClick={() => onFlip(targetChess)}
                  />
                )
              }
            </div>
          )
        } else {
          map.push(
            <div
              className={styles.itemContainer}
              key={`x-${x}/y-${y}`}
              onClick={() => onMapClick()}
            ></div>
          )
        }
      }
    }
    return map;
  }

  // const notAliveRedChesses = chineseChess.filter(c => !c.alive && c.side === ChessSide.Red);
  // const notAliveBlackChesses = chineseChess.filter(c => !c.alive && c.side === ChessSide.Black);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.leftPlayer}>
          <span className={styles.name}>
            {room.playerList[0].name}
            {userInfo.name === room.playerList[0].name &&
              <Icon
                type={IconType.HandPointLeft}
                size="lg"
                style={{
                  marginLeft: '10px'
                }}
                color="dark-warning"
              />
            }
          </span>
          {playerSide[room.playerList[0].id] &&
            <span className={styles.side}>
              {playerSide[room.playerList[0].id]}
            </span>
          }
        </div>
        <div className={styles.middle}>
          <span className={styles.name}>VS</span>
          <span className={isYourTurn ? styles.yourTurn : styles.otherTurn}>
            {isYourTurn ? '你的回合' : '對方回合'}
          </span>
        </div>
        <div className={`${styles.rightPlayer} ${yourSide === playerSide[room.playerList[1].id] ? styles.yourSide : ''}`}>
          <span className={styles.name}>
            {userInfo.name === room.playerList[1].name &&
              <Icon
                type={IconType.HandPointRight}
                size="lg"
                style={{
                  marginRight: '10px'
                }}
                color="dark-warning"
              />
            }
            {room.playerList[1].name}
          </span>
          {playerSide[room.playerList[1].id] &&
            <span className={styles.side}>
              {playerSide[room.playerList[1].id]}
            </span>
          }
        </div>
      </div>
      <div className={styles.content}>
        {/* <div className={styles.leftSides}>
          {notAliveRedChesses.map(c => (
            <span key={c.id} className={styles.chess}>{c.name}</span>
          ))}
        </div> */}
        <div className={styles.map}>
          <GameMap />
          <div className={styles.chesses}>
            {chessMap()}
          </div>
        </div>
        {/* <div className={styles.rightSides}>
          {notAliveBlackChesses.map(c => (
            <span key={c.id} className={styles.chess}>{c.name}</span>
          ))}
        </div> */}
      </div>
    </>
  );
}

export default Hidden;
