import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Layout from 'components/AppLayout';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectGames } from 'selectors/gamesSelector';
import { loadGames } from 'actions/gamesAction';
import styles from 'styles/pages/home.module.scss';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { games } = useSelector(selectGames);

  useEffect(() => {
    async function dispatchLoadGames() {
      await dispatch(loadGames());
    }
    dispatchLoadGames();
  }, [dispatch]);

  return (
    <Layout>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: "url('img/intro.jpg')" }}
      />
      <div className={styles.container}>
        <div className={styles.info}>
          <h1>熱門遊戲</h1>
          <p>歡迎來到 Gplay ，免費遊玩各式桌遊喔 ^^</p>
        </div>
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
              <div className={styles.gameBlock}>
                <div className={styles.gameTitle}>
                  <h2>{game.name}</h2>
                  <Button
                    title="PLAY"
                    onClick={() => router.push(`/games/${game.gamePack}`)}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Layout>
  );
}
