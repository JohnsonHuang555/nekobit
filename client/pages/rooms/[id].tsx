import React, { useEffect, useState } from "react";
import Button from "components/Button";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { SocketEvent } from "domain/models/WebSocket";
import {
  selectIsReadyToStart,
  selectRoomInfo,
  selectShowGameScreen,
} from "selectors/roomsSelector";
import { selectUserInfo } from "selectors/appSelector";
import styles from "styles/pages/rooms.module.scss";
import PlayerList from "components/rooms/PlayerList";
import GameScreen from "components/rooms/GameScreen";
import { wsConnect, wsDisconnect, wsSendMessage } from "actions/socketAction";
import { selectIsConnected } from "selectors/webSocketSelector";
import { setIsReadyToStart } from "slices/roomsSlice";
import ChatArea from "components/rooms/ChatArea";
import { selectGameInfo } from "selectors/gamesSelector";
import { loadGameInfo } from "actions/gamesAction";

const Room = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomId = router.query.id;
  const { selectedRoom } = useSelector(selectRoomInfo);
  const { selectedGame } = useSelector(selectGameInfo);
  const { isConnected } = useSelector(selectIsConnected);
  const { userInfo } = useSelector(selectUserInfo);
  const { showGameScreen } = useSelector(selectShowGameScreen);
  const { isReadyToStart } = useSelector(selectIsReadyToStart);
  const [startingCount, setStartingCount] = useState(5); // 倒數五秒遊戲開始

  // 清除副作用
  useEffect(() => {
    return () => {
      dispatch(wsDisconnect());
    };
  }, []);

  // 當房間創立之後連 socket
  useEffect(() => {
    if (roomId) {
      const host = `ws://localhost:5000/ws/${roomId}`;
      dispatch(wsConnect(host));
    }
  }, [roomId]);

  // 成功連到 socket 打 join event
  useEffect(() => {
    if (isConnected && userInfo) {
      dispatch(
        wsSendMessage({
          event: SocketEvent.JoinRoom,
          player_id: userInfo.id,
          data: {
            player_name: userInfo.name,
          },
        })
      );
    }
  }, [isConnected]);

  // 拿到房間之後打 getGameInfo
  useEffect(() => {
    async function dispatchLoadGameInfo(gamePack: string) {
      await dispatch(loadGameInfo(gamePack));
    }
    if (selectedRoom && !selectedGame) {
      dispatchLoadGameInfo(selectedRoom.gamePack);
    }
  }, [selectedRoom]);

  // 倒數計時監聽
  useEffect(() => {
    let interval: any = null;
    if (isReadyToStart) {
      interval = setInterval(() => {
        setStartingCount((seconds) => seconds - 1);
      }, 1000);
    }
    setStartingCount(5);
    return () => clearInterval(interval);
  }, [isReadyToStart]);

  // 計時結束打開始遊戲
  useEffect(() => {
    // 房主開始遊戲
    if (startingCount === 0 && playerInfo()?.isMaster) {
      dispatch(
        wsSendMessage({
          event: SocketEvent.StartGame,
          player_id: userInfo?.id as string,
          data: {
            game_pack: selectedRoom?.gamePack,
            game_mode: selectedRoom?.gameMode,
          },
        })
      );
    }
  }, [startingCount]);

  useEffect(() => {
    if (!showGameScreen) {
      dispatch(setIsReadyToStart(false));
      setStartingCount(5);
    }
  }, [showGameScreen]);

  const isNowPlayer = (id: string) => {
    if (userInfo && userInfo.id === id) {
      return true;
    }
    return false;
  };

  const playerInfo = () => {
    if (!selectedRoom || !userInfo) {
      return;
    }
    return selectedRoom.playerList.find((player) => {
      return player.id === userInfo.id;
    });
  };

  const isReadyToPlay = (): boolean => {
    if (!selectedGame || !selectedRoom) {
      return false;
    }
    const { playerList } = selectedRoom;
    const { maxPlayers } = selectedGame;
    const notReadyPlayers = playerList.filter((p) => !p.isReady);
    if (notReadyPlayers?.length !== 0 || maxPlayers > playerList.length) {
      return false;
    }
    return true;
  };

  return (
    <Layout>
      {userInfo && isConnected && selectedRoom && selectedGame && (
        <div className={styles.mainArea}>
          <div className={styles.leftArea}>
            <PlayerList
              selectedRoom={selectedRoom}
              isNowPlayer={(player) => isNowPlayer(player)}
            />

            {/* // TODO: 聊天 */}
            <div className={`${styles.block} ${styles.messages}`}>
              <div className={`${styles.content} ${styles.chat}`}>
                <ChatArea
                  messages={["hi", "yo", "hello"]}
                  startingCount={
                    isReadyToStart && startingCount !== 0
                      ? startingCount
                      : undefined
                  }
                  onSubmit={() => {}}
                />
              </div>
            </div>
          </div>
          <div className={`${styles.rightArea} ${styles.block}`}>
            {/* // TODO: 遊戲設定 */}
            <div className={styles.content}></div>
            {playerInfo()?.isMaster ? (
              <Button
                title="開始遊戲"
                color="secondary"
                onClick={() =>
                  dispatch(
                    wsSendMessage({
                      event: SocketEvent.ReadyToStart,
                      player_id: userInfo.id,
                    })
                  )
                }
                disabled={!isReadyToPlay()}
              />
            ) : (
              <Button
                title={playerInfo()?.isReady ? "取消準備" : "準備遊戲"}
                color="secondary"
                onClick={() =>
                  dispatch(
                    wsSendMessage({
                      event: SocketEvent.ReadyGame,
                      player_id: userInfo.id,
                    })
                  )
                }
              />
            )}
            <Button title="離開房間" color="grey-4" />
          </div>
          {showGameScreen && <GameScreen gamePack={selectedRoom.gamePack} />}
        </div>
      )}
    </Layout>
  );
};

export default Room;
