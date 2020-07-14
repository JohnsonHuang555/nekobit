import { TRoom } from "../../domain/models/Room";
import { Box, Button } from "@material-ui/core";
import { GameList } from "../../domain/models/Game";
import ChineseChessView from "src/features/games/chinese_chess/chineseChessView";
import { TChineseChess, ChessSide } from "src/features/games/domain/models/ChineseChess";

type GameScreenProps = {
  roomInfo: TRoom;
  userID: string;
  isYouMaster: boolean;
  playerSide: T;
  onSetPlayOrder: () => void;
  updateRoomInfo: (rf: TRoom) => void;
  onGameOver: (iyw: boolean) => void;
};

const GameScreen = (props: GameScreenProps) => {
  const {
    roomInfo,
    userID,
    isYouMaster,
    playerSide,
    onSetPlayOrder,
    updateRoomInfo,
    onGameOver,
  } = props;

  const yourTurn = roomInfo.nowTurn && userID === roomInfo.nowTurn ? true : false;

  const updateRoomInfoHandler = (rf: Partial<TRoom>) => {
    const newRoomInfo: TRoom = {
      ...roomInfo,
      ...rf,
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
        yourTurn={yourTurn}
        playerSide={playerSide}
        updateChineseChess={updateRoomInfoHandler}
        updateNowTurn={updateRoomInfoHandler}
        updateUserList={updateRoomInfoHandler}
        onGameOver={onGameOver}
      />
  };

  return (
    <Box className="game-screen">
      {!roomInfo.nowTurn && isYouMaster && (
        <Button className="set-play-order" onClick={onSetPlayOrder}>
          決定順序
        </Button>
      )}
      {yourTurn && (
        <div className="your-turn">你的回合</div>
      )}
      <div className="your-side">{playerSide}</div>
      {playGame[roomInfo.gameId as GameList]}
    </Box>
  );
};

export default GameScreen;
