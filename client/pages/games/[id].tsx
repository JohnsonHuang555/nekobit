import React, { useEffect } from 'react';
import Layout from 'components/Layout';
import Button from 'components/Button';
import { GamePack, GameStatus, Room } from 'domain/models/Room';
import Icon, { IconType } from 'components/Icon';
import { useRouter } from 'next/router';
import styles from 'styles/pages/games.module.scss';
import { useDispatch } from 'react-redux';
import { loadGameInfo } from 'domain/action/games/fetchAction';

const rooms: Room[] = [
  {
    id: '123',
    title: '快來PK',
    password: '',
    status: GameStatus.Preparing,
    players: [
      {
        id: '123456',
        name: 'Johnson',
        isMaster: true,
        isReady: false,
        playOrder: -1,
        group: 1,
      }
    ],
    nowTurn: '',
    gameData: {},
    gameMode: '',
    gamePack: GamePack.ChineseChess,
    createdAt: '',
  },
  {
    id: '456',
    title: '快來PK2',
    password: '',
    status: GameStatus.Playing,
    players: [
      {
        id: '324',
        name: 'Jack',
        isMaster: true,
        isReady: true,
        playOrder: 0,
        group: 1,
      },
      {
        id: '666',
        name: 'Harry',
        isMaster: false,
        isReady: true,
        playOrder: 1,
        group: 2,
      }
    ],
    nowTurn: '666',
    gameData: {},
    gameMode: 'hidden',
    gamePack: GamePack.ChineseChess,
    createdAt: '',
  },
  {
    id: '789',
    title: '快來PK3',
    password: '',
    status: GameStatus.Playing,
    players: [
      {
        id: '324',
        name: 'Jack',
        isMaster: true,
        isReady: true,
        playOrder: 0,
        group: 1,
      },
      {
        id: '666',
        name: 'Harry',
        isMaster: false,
        isReady: true,
        playOrder: 1,
        group: 2,
      }
    ],
    nowTurn: '666',
    gameData: {},
    gameMode: 'hidden',
    gamePack: GamePack.ChineseChess,
    createdAt: '',
  },
  {
    id: '789',
    title: '快來PK3',
    password: '',
    status: GameStatus.Playing,
    players: [
      {
        id: '324',
        name: 'Jack',
        isMaster: true,
        isReady: true,
        playOrder: 0,
        group: 1,
      },
      {
        id: '666',
        name: 'Harry',
        isMaster: false,
        isReady: true,
        playOrder: 1,
        group: 2,
      }
    ],
    nowTurn: '666',
    gameData: {},
    gameMode: 'hidden',
    gamePack: GamePack.ChineseChess,
    createdAt: '',
  },
  {
    id: '789',
    title: '快來PK3',
    password: '',
    status: GameStatus.Playing,
    players: [
      {
        id: '324',
        name: 'Jack',
        isMaster: true,
        isReady: true,
        playOrder: 0,
        group: 1,
      },
      {
        id: '666',
        name: 'Harry',
        isMaster: false,
        isReady: true,
        playOrder: 1,
        group: 2,
      }
    ],
    nowTurn: '666',
    gameData: {},
    gameMode: 'hidden',
    gamePack: GamePack.ChineseChess,
    createdAt: '',
  },
  {
    id: '789',
    title: '快來PK3',
    password: '',
    status: GameStatus.Playing,
    players: [
      {
        id: '324',
        name: 'Jack',
        isMaster: true,
        isReady: true,
        playOrder: 0,
        group: 1,
      },
      {
        id: '666',
        name: 'Harry',
        isMaster: false,
        isReady: true,
        playOrder: 1,
        group: 2,
      }
    ],
    nowTurn: '666',
    gameData: {},
    gameMode: 'hidden',
    gamePack: GamePack.ChineseChess,
    createdAt: '',
  },
  {
    id: '789',
    title: '快來PK3',
    password: '',
    status: GameStatus.Playing,
    players: [
      {
        id: '324',
        name: 'Jack',
        isMaster: true,
        isReady: true,
        playOrder: 0,
        group: 1,
      },
      {
        id: '666',
        name: 'Harry',
        isMaster: false,
        isReady: true,
        playOrder: 1,
        group: 2,
      }
    ],
    nowTurn: '666',
    gameData: {},
    gameMode: 'hidden',
    gamePack: GamePack.ChineseChess,
    createdAt: '',
  },
  {
    id: '789',
    title: '快來PK3',
    password: '',
    status: GameStatus.Playing,
    players: [
      {
        id: '324',
        name: 'Jack',
        isMaster: true,
        isReady: true,
        playOrder: 0,
        group: 1,
      },
      {
        id: '666',
        name: 'Harry',
        isMaster: false,
        isReady: true,
        playOrder: 1,
        group: 2,
      }
    ],
    nowTurn: '666',
    gameData: {},
    gameMode: 'hidden',
    gamePack: GamePack.ChineseChess,
    createdAt: '',
  },
];

const Game = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const gameId = String(router.query.id);

  useEffect(() => {
    async function dispatchLoadGameInfo() {
      await dispatch(loadGameInfo(gameId));
    }
    dispatchLoadGameInfo();
  }, [dispatch]);

  const roomStatus = (status: GameStatus) => {
    return status === GameStatus.Preparing ? styles.preparing : styles.playing;
  }

  return (
    <Layout>
      <div className="header">
        <h2 className="page-title">象棋</h2>
      </div>
      <div className={styles.row}>
        <div className={styles.detail}>
          <img
            src="https://1.bp.blogspot.com/-U5rTlenivu4/V-pYEdCNCnI/AAAAAAAARCA/d-3heuMuTIMfOl6aNFOoO156Am9QrIWRQCLcB/s1600/%25E8%25B1%25A1%25E6%25A3%258B.jpg"
            alt="detail"
            width="100%"
            height={250}
          />
          <div className={styles.description}>
            兩人對弈的桌遊，有幾百年歷史
            兩人對弈的桌遊，有幾百年歷史
            兩人對弈的桌遊，有幾百年歷史
            哈哈哈哈
          </div>
          <div className={styles.controls}>
            <Button title="新增房間" color="secondary" />
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
                <Icon type={IconType.Key} label="私密" />
              </div>
              <div className={styles.roomInfo}>
                <span className={styles.gameStatus}>Waiting...</span>
                <span className={`${styles.infoBlock} ${roomStatus(room.status)}`}>
                  <Icon type={IconType.TwoUsers} label="1/2" />
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
