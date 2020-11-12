import React from 'react';
import Layout from 'components/Layout';
import styles from 'styles/pages/games.module.scss';
import Icon, { IconType } from 'components/Icon';

const categoryList = [
  {
    id: 1,
    icon: IconType.Fire,
    title: '最受歡迎遊戲',
    checked: false,
  },
  {
    id: 2,
    icon: IconType.Rocket,
    title: '最新上架遊戲',
    checked: false,
  },
  {
    id: 3,
    icon: IconType.TheaterMasks,
    title: '陣營心機',
    checked: false,
  },
  {
    id: 4,
    icon: IconType.Users,
    title: '派對多人遊玩',
    checked: false,
  },
  {
    id: 5,
    icon: IconType.ChessKnight,
    title: '經典棋盤',
    checked: false,
  },
];

const Games = () => {
  return (
    <Layout>
      <div className={styles.header}>
        <h2 className="page-title">遊戲列表</h2>
        <div className={styles.filters}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.categories}>
          <div className={styles.title}>
            主題分類
          </div>
          {categoryList.map(category => (
            <div key={category.id} className={styles.categoryRow}>
              <Icon type={category.icon} />
              <div className={styles.categoryTitle}>{category.title}</div>
            </div>
          ))}
        </div>
        <div className={styles.games}>
222
        </div>
      </div>
    </Layout>
  )
}

export default Games;
