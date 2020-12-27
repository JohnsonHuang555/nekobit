import { useDispatch } from "react-redux";
import { HiddenProps } from "../hidden/Hidden";
import GameMap from "./StandardMap";
import styles from 'styles/features/standard.module.scss';

export type StandardProps = HiddenProps;

const Standard = (props: StandardProps) => {
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
    // let map = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 9; x++) {
        const chess = chineseChess.find(c => {
          return c.locationX === x && c.locationY === y && c.alive;
        });
      }
    }
    return <div></div>;
  };

  return (
    <>
      <div className={styles.header}>
        <span>{room.playerList[0].name}</span>
        <div className={styles.vsArea}>
          {isYourTurn ? '你的回合' : '對方回合'}
        </div>
        <span>{room.playerList[1].name}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          {playerSide[room.playerList[0].id] &&
            <span className={styles.side}>
              {playerSide[room.playerList[0].id]}
            </span>
          }
        </div>
        <div className={styles.map}>
          <GameMap />
          <div className={styles.chesses}>
            {chessMap()}
          </div>
        </div>
        <div className={styles.rightSide}>
          {playerSide[room.playerList[1].id] &&
            <span className={styles.side}>
              {playerSide[room.playerList[1].id]}
            </span>
          }
        </div>
      </div>
    </>
  )
};

export default Standard;
