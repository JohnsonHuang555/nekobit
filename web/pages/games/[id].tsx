import React, { useEffect, useState } from 'react';
import { loadGameInfo } from 'actions/GameAction';
import Layout from 'components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from 'styles/pages/game.module.scss';
import { gameSelector } from 'selectors/GameSelector';
import { Button } from '@material-ui/core';
import { roomsSelector } from 'selectors/RoomSelector';
import { GameStatus } from 'domain/models/Room';
import Icon from 'components/Icon';
import { People } from '@material-ui/icons';
import { EnhanceGame } from 'domain/models/Game';
import { loadRooms } from 'actions/RoomAction';
import { userInfoSelector } from 'selectors/AppSelector';
import { setSnackbar } from 'actions/AppAction';
import CreateRoom, { CreateRoomParams } from 'components/modals/CreateRoom';

const Game = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const gamePack = router.query.id;
  const game = useSelector(gameSelector);
  const rooms = useSelector(roomsSelector);
  const userInfo = useSelector(userInfoSelector);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

  useEffect(() => {
    if (gamePack) {
      dispatch(loadGameInfo(String(gamePack)));
      dispatch(loadRooms(String(gamePack)));
    }
  }, [dispatch, gamePack]);

  if (!game || !rooms) {
    return null;
  }

  const roomStatus = (status: GameStatus) => {
    return status === GameStatus.Preparing ? styles.preparing : styles.playing;
  };

  const onJoinRoom = (id: string) => {
    // if (!userInfo) {
    //   showLoginToast();
    //   return;
    // }
    // router.push(`/rooms/${id}`);
  };

  const onCreateRoom = (params: CreateRoomParams) => {
    if (!userInfo) {
      dispatch(
        setSnackbar({
          show: true,
          message: '請先登入',
        })
      );
      return;
    }
  };

  return (
    <Layout>
      <CreateRoom
        show={showCreateRoomModal}
        selectedGame={game}
        onClose={() => setShowCreateRoomModal(false)}
        onCreateRoom={onCreateRoom}
      />
      <h2 className={styles.title}>{game.name}</h2>
      <div className={styles.row}>
        <div className={styles.detail}>
          <img
            src={`${game.imgUrl}/game.png`}
            alt="detail"
            width="100%"
            height={250}
          />
          <div className={styles.description}>{game.description}</div>
          <div className={styles.controls}>
            <Button
              variant="outlined"
              size="large"
              className={styles.play}
              onClick={() => setShowCreateRoomModal(true)}
            >
              建立房間
            </Button>
            <Button variant="outlined" size="large" className={styles.play}>
              快速加入
            </Button>
          </div>
        </div>
        <div className={styles.rooms}>
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`${styles.room} ${roomStatus(room.status)}`}
            >
              <div
                className={`${styles.roomHeader} ${roomStatus(room.status)}`}
              >
                <div className={styles.roomTitle}>
                  <span>001</span>
                  <div className={styles.roomName}>{room.title}</div>
                </div>
                {/* TODO: password */}
                {/* {room.password && <Icon type={IconType.Key} label="私密" />} */}
              </div>
              <div className={styles.roomInfo}>
                <span className={styles.gameStatus}>
                  {room.status === GameStatus.Preparing
                    ? 'Waiting...'
                    : 'Playing...'}
                </span>
                <span
                  className={`${styles.infoBlock} ${roomStatus(room.status)}`}
                >
                  <Icon
                    title={`${room.playerList.length}/${game.maxPlayers}`}
                    customStyles={{ marginRight: '10px' }}
                  >
                    <People />
                  </Icon>
                </span>
                <span
                  className={`${styles.infoBlock} ${roomStatus(room.status)}`}
                >
                  {EnhanceGame[game.gamePack][room.gameMode]}
                </span>
                <Button
                  variant="outlined"
                  size="large"
                  className={styles.play}
                  onClick={() => onJoinRoom(room.id)}
                >
                  加入
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Game;
