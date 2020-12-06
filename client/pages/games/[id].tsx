import React, { useEffect } from 'react';
import Layout from 'components/Layout';
import Button from 'components/Button';
import { GamePack, GameStatus } from 'domain/models/Room';
import Icon, { IconType } from 'components/Icon';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { loadGameInfo } from 'actions/gamesAction';
import { selectGameInfo } from 'selectors/gamesSelector';
import { selectCreatedId, selectRooms } from 'selectors/roomsSelector';
import styles from 'styles/pages/games.module.scss';
import { createRoom, loadRooms } from 'actions/roomsAction';

const Game = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const gameId = router.query.id;
  const { selectedGame } = useSelector(selectGameInfo);
  const { rooms } = useSelector(selectRooms);
  const { createdId } = useSelector(selectCreatedId);

  useEffect(() => {
    async function dispatchLoadGameInfo() {
      await dispatch(loadGameInfo(String(gameId)));
    }
    async function dispatchLoadRooms() {
      await dispatch(loadRooms());
    }
    if (gameId) {
      dispatchLoadGameInfo();
      dispatchLoadRooms();
    }
  }, [dispatch, gameId]);

  useEffect(() => {
    if (createdId) {
      router.push(`/rooms/${createdId}`)
    }
  }, [createdId]);

  const roomStatus = (status: GameStatus) => {
    return status === GameStatus.Preparing ?
      styles.preparing :
      styles.playing;
  }

  // TODO: 空白畫面 未來可以補 loading
  if (!selectedGame) {
    return null;
  }

  return (
    <Layout>
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
          <div className={styles.description}>
            {selectedGame.description}
          </div>
          <div className={styles.controls}>
           {/* TODO: 跳model */}
            <Button
              title="建立房間"
              color="secondary"
              onClick={() => dispatch(createRoom({
                title: '來',
                password: '',
                game_pack: GamePack.ChineseChess,
                game_mode: 'hidden',
              }))}
            />
            <Button title="快速加入" color="grey-4" />
          </div>
        </div>
        <div className={styles.rooms}>
          {rooms.map(room => (
            <div key={room.id} className={`${styles.room} ${roomStatus(room.status)}`}>
              <div className={`${styles.roomHeader} ${roomStatus(room.status)}`}>
                <div className={styles.roomTitle}>
                  <span>001</span>
                  <div className={styles.roomName}>
                    {room.title}
                  </div>
                </div>
                {room.password && <Icon type={IconType.Key} label="私密" />}
              </div>
              <div className={styles.roomInfo}>
                <span className={styles.gameStatus}>
                  {room.status === GameStatus.Preparing ? 'Waiting...' : 'Playing...'}
                </span>
                <span className={`${styles.infoBlock} ${roomStatus(room.status)}`}>
                  <Icon
                    type={IconType.TwoUsers}
                    label={`${room.playerList.length}/${selectedGame.maxPlayers}`}
                    size="md"
                  />
                </span>
                <span className={`${styles.infoBlock} ${roomStatus(room.status)}`}>
                  一般模式
                </span>
                <Button
                  title="加入"
                  color="grey-4"
                  onClick={() => router.push(`/rooms/${room.id}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Game;
