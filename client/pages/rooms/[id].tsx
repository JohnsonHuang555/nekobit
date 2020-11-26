import React from 'react';
import Button from 'components/Button';
import Layout from 'components/Layout';
import styles from 'styles/pages/rooms.module.scss';

const Room = () => {
  return (
    <Layout>
      <div className={styles.mainArea}>
        <div className={styles.leftArea}>
          <div className={styles.block}>123</div>
          <div className={styles.block}>333</div>
        </div>
        <div className={`${styles.rightArea} ${styles.block}`}>
          <Button title="開始遊戲" />
          <Button title="離開房間" />
        </div>
      </div>
    </Layout>
  )
};

export default Room;
