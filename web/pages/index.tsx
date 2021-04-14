import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from 'store';
import { loadGames } from 'actions/GameAction';
import { END } from 'redux-saga';
import { gamesSelector } from 'selectors/GameSelector';
import Layout from 'components/Layout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';
import { GamePack } from 'domain/models/Room';
import styles from 'styles/pages/index.module.scss';
import { Person, Schedule } from '@material-ui/icons';
import Icon from 'components/Icon';

const fakeGames = [
  {
    id: '123-555',
    name: '象棋',
    minPlayers: 2,
    maxPlayers: 2,
    brief: '對弈',
    description: 'PKPK',
    imgUrl: '/img/chinese-chess',
    estimateTime: 30,
    modes: [],
    gamePack: GamePack.ChineseChess,
    createAt: '',
    updateAt: '',
  },
  {
    id: '888-555',
    name: '西洋棋',
    minPlayers: 2,
    maxPlayers: 2,
    brief: '對弈',
    description: 'PKPK',
    imgUrl: '/img/chess',
    estimateTime: 30,
    modes: [],
    gamePack: GamePack.ChineseChess,
    createAt: '',
    updateAt: '',
  },
];

function Home() {
  const router = useRouter();
  const games = useSelector(gamesSelector);

  if (!games) {
    return null;
  }

  return (
    <Layout>
      <h2 className={styles.title}>推薦遊戲</h2>
      <div className={styles.games}>
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            // when window width is >= 640px
            640: {
              width: 640,
              slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 3,
            },
            // when window width is >= 768px
            1024: {
              width: 1024,
              slidesPerView: 4,
            },
            // when window width is >= 768px
            1200: {
              width: 1200,
              slidesPerView: 5,
            },
          }}
        >
          {games.map((game) => (
            <SwiperSlide key={game.id} className={styles.swiperSlide}>
              <img
                src={`${game.imgUrl}/home.png`}
                alt={game.name}
                width="100%"
                height="100%"
              />
              <div className={styles.game}>
                <span className={styles.name}>{game.name}</span>
                <Button variant="outlined" size="large" className={styles.play}>
                  PLAY
                </Button>
                <div className={styles.icons}>
                  <Icon
                    title={game.maxPlayers}
                    customStyles={{ marginRight: '10px' }}
                  >
                    <Person />
                  </Icon>
                  <Icon title={game.estimateTime}>
                    <Schedule />
                  </Icon>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Layout>
  );
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (!store.getState().games) {
    store.dispatch(loadGames());
    store.dispatch(END);
  }

  await store.sagaTask.toPromise();
});

export default Home;
