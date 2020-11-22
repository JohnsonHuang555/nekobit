import React from 'react';
import Layout from 'components/Layout';
import Button from 'components/Button';
import styles from 'styles/pages/games.module.scss';
import { GamePack, GameStatus, Room } from 'models/Room';
import Icon, { IconType } from 'components/Icon';

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
];

const Game = () => {
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
            <Button title="新增房間" />
            <Button title="快速加入" />
          </div>
        </div>
        <div className={styles.rooms}>
          {rooms.map(room => (
            // FIXME: 抽出來
            <div className={`${styles.room} ${room.status === GameStatus.Preparing ? styles.preparing : styles.playing}`}>
              <div className={`${styles.roomHeader} ${room.status === GameStatus.Preparing ? styles.preparing : styles.playing}`}>
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
                <span className={styles.infoBlock}>
                  <Icon type={IconType.TwoUsers} label="1/2" />
                </span>
                <span className={styles.infoBlock}>一般模式</span>
                <span>
                  <Button title="加入" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Game;
