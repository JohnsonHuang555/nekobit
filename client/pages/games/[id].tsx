import React from 'react';
import Layout from 'components/Layout';
import styles from 'styles/pages/games.module.scss';
import Button from 'components/Button';

const rooms = [
  {

  }
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
        <div className={styles.rooms}>222</div>
      </div>
    </Layout>
  );
};

export default Game;
