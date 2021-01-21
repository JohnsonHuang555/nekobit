import { useDispatch } from "react-redux";
import { HiddenProps } from "../hidden/Hidden";
import GameMap from "./StandardMap";
import styles from "styles/features/standard.module.scss";
import { ChessSide } from "features/chinese_chess/domain/models/ChineseChess";
import {
  CheckMate,
  setCanEat,
  setCanMove,
} from "features/chinese_chess/slices/chineseChessSlice";

export type StandardProps = Omit<
  HiddenProps,
  "yourSide" | "playersId" | "playerSide"
> & {
  checkMate: CheckMate;
};

const Standard = (props: StandardProps) => {
  const {
    room,
    isYourTurn,
    chineseChess,
    userInfo,
    selectedChess,
    checkMate,
    onSelectChess,
  } = props;
  const dispatch = useDispatch();
  const { isCheck, playerId } = checkMate;

  const getPlayerSide = (id: string) => {
    // 紅方玩家
    const redPlayer = room.playerList.find(
      (p) => p.id === id && p.playOrder === 0
    );
    if (redPlayer) {
      return ChessSide.Red;
    }
    return ChessSide.Black;
  };

  const yourSide = () => {
    return getPlayerSide(userInfo.id);
  };

  const chessMap = () => {
    let map = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 9; x++) {
        const targetChess = chineseChess.find((c) => {
          return c.locationX === x && c.locationY === y && c.alive;
        });

        const onMove = () => {
          if (selectedChess) {
            dispatch(
              setCanMove({
                chessId: selectedChess.id,
                targetX: x,
                targetY: y,
                chesses: chineseChess,
                mode: "standard",
              })
            );
          }
        };

        const onChessClick = () => {
          if (!targetChess || !isYourTurn) {
            return;
          }
          if (yourSide() === targetChess.side) {
            console.log("selected");
            onSelectChess(targetChess);
          } else if (selectedChess && selectedChess.side !== targetChess.side) {
            // eat chess
            dispatch(
              setCanEat({
                chessId: selectedChess.id,
                targeId: targetChess.id, // FIXME: 打包
                targetName: targetChess.name,
                targetRank: targetChess.rank,
                targetX: targetChess.locationX,
                targetY: targetChess.locationY,
                chesses: chineseChess,
                mode: "standard",
              })
            );
          }
        };

        if (targetChess) {
          map.push(
            <div className={styles.itemContainer} key={`x-${x}/y-${y}`}>
              <span
                className={`${styles.flipedChess} ${
                  targetChess.side === ChessSide.Black
                    ? styles.black
                    : styles.red
                } ${
                  selectedChess?.id === targetChess.id
                    ? styles.selectedChess
                    : ""
                }`}
                onClick={() => onChessClick()}
              >
                <span className={yourSide() === ChessSide.Black ? styles.blackSide : ''}>{targetChess.name}</span>
                <span
                  className={`${styles.circle} ${
                    targetChess.side === ChessSide.Red ? styles.red : ""
                  }`}
                ></span>
              </span>
            </div>
          );
        } else {
          map.push(
            <div
              className={styles.itemContainer}
              key={`x-${x}/y-${y}`}
              onClick={() => onMove()}
            ></div>
          );
        }
      }
    }
    return map;
  };

  return (
    <>
      <div className={styles.header}>
        {/* FIXME: UI */}
        <span>
          {room.playerList[0].name} {getPlayerSide(room.playerList[0].id)}
          {isCheck && playerId === room.playerList[0].id && <span>將軍</span>}
        </span>
        <div className={styles.vsArea}>
          {isYourTurn ? "你的回合" : "對方回合"}
        </div>
        <span>
          {room.playerList[1].name} {getPlayerSide(room.playerList[1].id)}
          {isCheck && playerId === room.playerList[1].id && <span>將軍</span>}
        </span>
      </div>
      <div className={styles.content}>
        <div className={styles.map}>
          <GameMap />
          <div className={`${styles.chesses} ${yourSide() === ChessSide.Black ? styles.blackSide : ''}`}>
            {chessMap()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Standard;
