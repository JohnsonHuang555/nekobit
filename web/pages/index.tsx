import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loadGames } from 'actions/GameAction';
import { gamesSelector } from 'selectors/GameSelector';
import Layout from 'components/Layout';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';
import { Person, Schedule } from '@material-ui/icons';
import Icon from 'components/Icon';
import styles from 'styles/pages/index.module.scss';

function Home() {
  const router = useRouter();
  const games = useSelector(gamesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

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
                <Button
                  variant="outlined"
                  size="large"
                  className={styles.play}
                  onClick={() => router.push(`/games/${game.gamePack}`)}
                >
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

export default Home;
