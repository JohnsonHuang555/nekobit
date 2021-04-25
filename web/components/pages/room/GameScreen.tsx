import { GamePack } from 'domain/models/Room';
// import ChineseChessContainer from "features/chinese_chess/components/ChineseChessContainer";
import styles from 'styles/pages/rooms/gameScreen.module.scss';

type GameScreenProps = {
  gamePack: GamePack;
};

/** 決定要使用的遊戲 */
const GameScreen = (props: GameScreenProps) => {
  const { gamePack } = props;

  const playingGame: { [key: string]: JSX.Element } = {
    // [GamePack.ChineseChess]: <ChineseChessContainer />,
  };

  return <div className={styles.gameScreen}>{playingGame[gamePack]}</div>;
};

export default GameScreen;
