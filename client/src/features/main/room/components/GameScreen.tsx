import { TRoom } from "../../domain/models/Room";
import { Box } from "@material-ui/core";
import ChineseChess from "src/features/games/chinese_chess/ChineseChess";
import { GameList } from "../../domain/models/Game";

type GameScreenProps = {
  roomInfo: TRoom;
};

const GameScreen = (props: GameScreenProps) => {
  const {
    roomInfo,
  } = props;

  const playGame = {
    [GameList.ChineseChess]:
      <ChineseChess
        userID="test"
        roomInfo={roomInfo}
        onChangeRoomInfo={() => {}}
        ws={new WebSocket('')}
      />
  };

  return (
    <Box className="game-screen">
      {playGame[roomInfo.gameName as GameList]}
    </Box>
  );
};

export default GameScreen;
