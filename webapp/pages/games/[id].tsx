import React, { useEffect } from 'react';
import Layout from 'components/AppLayout';
import { GameStatus } from 'domain/models/Room';
import Icon, { IconType } from 'components/Icon';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loadGameInfo } from 'actions/gamesAction';
import { selectGameInfo } from 'selectors/gamesSelector';
import { selectCreatedId, selectRooms } from 'selectors/roomsSelector';
import styles from 'styles/pages/games.module.scss';
import { loadRooms } from 'actions/roomsAction';
import { selectShowModal, selectUserInfo } from 'selectors/appSelector';
import { toast } from 'react-toastify';
import CreateRoomModal from 'components/modals/CreateRoomModal';
import { setShowModal } from 'slices/appSlice';
import { EnhanceGame } from 'domain/models/Game';
import { Button } from '@material-ui/core';

const Game = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const gamePack = router.query.id;
  const { selectedGame } = useSelector(selectGameInfo);
  const { rooms } = useSelector(selectRooms);
  const { createdId } = useSelector(selectCreatedId);
  const { userInfo } = useSelector(selectUserInfo);
  const { showModal } = useSelector(selectShowModal);

  useEffect(() => {
    async function dispatchLoadGameInfo() {
      await dispatch(loadGameInfo(String(gamePack)));
    }
    async function dispatchLoadRooms() {
      await dispatch(loadRooms(String(gamePack)));
    }
    if (gamePack) {
      dispatchLoadGameInfo();
      dispatchLoadRooms();
    }
  }, [dispatch, gamePack]);

  useEffect(() => {
    if (createdId) {
      router.push(`/rooms/${createdId}`);
    }
  }, [createdId]);

  const roomStatus = (status: GameStatus) => {
    return status === GameStatus.Preparing ? styles.preparing : styles.playing;
  };

  // TODO: 空白畫面 未來可以補 loading
  if (!selectedGame) {
    return null;
  }

  const showLoginToast = () => {
    toast.warn('⚠️ 請先登入唷');
  };

  const onCreateRoom = () => {
    if (!userInfo) {
      showLoginToast();
      return;
    }
    dispatch(setShowModal(true));
  };

  const onJoinRoom = (id: string) => {
    if (!userInfo) {
      showLoginToast();
      return;
    }
    router.push(`/rooms/${id}`);
  };

  return (
    <Layout>
      {userInfo && <CreateRoomModal show={showModal} />}
      <div className="header">
        <h2 className="page-title">{selectedGame.name}</h2>
      </div>
      <div className={styles.row}>
        <div className={styles.detail}>
          <img
            src={`${selectedGame.imgUrl}/game.png`}
            alt="detail"
            width="100%"
            height={250}
          />
          <div className={styles.description}>{selectedGame.description}</div>
          <div className={styles.controls}>
            <Button
              variant="contained"
              color="secondary"
              size="medium"
              onClick={() => onCreateRoom()}
            >
              建立房間
            </Button>
            <Button variant="contained" color="secondary" size="medium">
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
                {room.password && <Icon type={IconType.Key} label="私密" />}
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
                    type={IconType.TwoUsers}
                    label={`${room.playerList.length}/${selectedGame.maxPlayers}`}
                    size="md"
                  />
                </span>
                <span
                  className={`${styles.infoBlock} ${roomStatus(room.status)}`}
                >
                  {EnhanceGame[selectedGame.gamePack][room.gameMode]}
                </span>
                <Button
                  color="inherit"
                  disabled={
                    selectedGame.maxPlayers === room.playerList.length
                      ? true
                      : false
                  }
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
