import { TRoom } from "../../domain/models/Room";
import { Box } from "@material-ui/core";
import { GameList } from "../../domain/models/Game";
import ChineseChessView from "src/features/games/chinese_chess/chineseChessView";
import { TChineseChess } from "src/features/games/domain/models/ChineseChess";

type GameScreenProps = {
  roomInfo: TRoom;
  updateRoomInfo: (rf: TRoom) => void;
};

const GameScreen = (props: GameScreenProps) => {
  const {
    roomInfo,
    updateRoomInfo,
  } = props;

  const updateChineseChess = (chesses: TChineseChess[]) => {
    const newRoomInfo: TRoom = {
      ...roomInfo,
      gameData: chesses
    };

    // 傳遞新的 roomInfo 外部做更新
    updateRoomInfo(newRoomInfo);
  };

  const playGame = {
    [GameList.ChineseChess]:
      <ChineseChessView
        roomID={roomInfo.id}
        chesses={roomInfo.gameData as TChineseChess[]}
        mode={roomInfo.mode}
        updateChineseChess={updateChineseChess}
      />
  };

  return (
    <Box className="game-screen">
      {playGame[roomInfo.gameId as GameList]}
    </Box>
  );
};

export default GameScreen;
