import { Box } from "@material-ui/core";
import { GameList } from "../../domain/models/Game";
import ChineseChessContainer from "src/features/games/chinese_chess/ChineseChessContainer";
import styles from '@styles/components/gameScreen.module.scss';

type GameScreenProps = {
  gameId: string;
};

/** 決定要使用的遊戲 */
const GameScreen = (props: GameScreenProps) => {
  const {
    gameId,
  } = props;

  const playGame = {
    [GameList.ChineseChess]:
      <ChineseChessContainer />,
  };

  return (
    <Box className={styles.gameScreen}>
      {playGame[gameId as GameList]}
    </Box>
  );
};

export default GameScreen;
