import { TRoom, TRoomUser } from "../../domain/models/Room";
import { Box, Button } from "@material-ui/core";
import { GameList } from "../../domain/models/Game";
import ChineseChessView from "src/features/games/chinese_chess/chineseChessView";
import { TChineseChess } from "src/features/games/domain/models/ChineseChess";

type GameScreenProps = {
  roomInfo: TRoom;
  onSetPlayOrder: () => void;
  updateRoomInfo: (rf: TRoom) => void;
};

const GameScreen = (props: GameScreenProps) => {
  const {
    roomInfo,
    onSetPlayOrder,
    updateRoomInfo,
  } = props;

  const updateRoomInfoHandler = (rf: Partial<TRoom>) => {
    console.log(rf)
    const newRoomInfo: TRoom = {
      ...roomInfo,
      ...rf,
    };

    // 傳遞新的 roomInfo 外部做更新
    updateRoomInfo(newRoomInfo);
  };

  // const updateNowTurn = (nowTurn: string) => {
  //   const newRoomInfo: TRoom = {
  //     ...roomInfo,
  //     nowTurn,
  //   };

  //   // 傳遞新的 roomInfo 外部做更新
  //   updateRoomInfo(newRoomInfo);
  // };

  // const updateUserList = (userList: TRoomUser[]) => {
  //   const newRoomInfo: TRoom = {
  //     ...roomInfo,
  //     userList,
  //   }

  //   // 傳遞新的 roomInfo 外部做更新
  //   updateRoomInfo(newRoomInfo);
  // };

  const playGame = {
    [GameList.ChineseChess]:
      <ChineseChessView
        roomID={roomInfo.id}
        chesses={roomInfo.gameData as TChineseChess[]}
        mode={roomInfo.mode}
        updateChineseChess={updateRoomInfoHandler}
        updateNowTurn={updateRoomInfoHandler}
        updateUserList={updateRoomInfoHandler}
      />
  };

  return (
    <Box className="game-screen">
      <Button className="set-play-order" onClick={onSetPlayOrder}>決定順序</Button>
      {playGame[roomInfo.gameId as GameList]}
    </Box>
  );
};

export default GameScreen;
