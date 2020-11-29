import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Layout from 'components/Layout';
import { Game } from 'models/Game';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { selectGames } from 'selectors/gamesSelector';
import { loadGames } from 'actions/games/fetchAction';
import styles from 'styles/pages/home.module.scss';

const testData: Game[] = [
  {
    id: '123-555',
    name: '象棋',
    minPlayers: 2,
    maxPlayers: 2,
    brief: '對弈',
    description: 'PKPK',
    imgUrl: '/img/chinese-chess',
    estimateTime: 30,
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
    createAt: '',
    updateAt: '',
  },
  {
    id: 'dfgfd-555',
    name: '西洋棋',
    minPlayers: 2,
    maxPlayers: 2,
    brief: '對弈',
    description: 'PKPK',
    imgUrl: '/img/chess',
    estimateTime: 30,
    createAt: '',
    updateAt: '',
  },
  {
    id: '888-dfg',
    name: '西洋棋',
    minPlayers: 2,
    maxPlayers: 2,
    brief: '對弈',
    description: 'PKPK',
    imgUrl: '/img/chess',
    estimateTime: 30,
    createAt: '',
    updateAt: '',
  },
  {
    id: '888-sddd',
    name: '西洋棋',
    minPlayers: 2,
    maxPlayers: 2,
    brief: '對弈',
    description: 'PKPK',
    imgUrl: '/img/chess',
    estimateTime: 30,
    createAt: '',
    updateAt: '',
  },
  {
    id: 'ssdfg-555',
    name: '西洋棋',
    minPlayers: 2,
    maxPlayers: 2,
    brief: '對弈',
    description: 'PKPK',
    imgUrl: '/img/chess',
    estimateTime: 30,
    createAt: '',
    updateAt: '',
  },
  {
    id: 'www-555',
    name: '西洋棋',
    minPlayers: 2,
    maxPlayers: 2,
    brief: '對弈',
    description: 'PKPK',
    imgUrl: '/img/chess',
    estimateTime: 30,
    createAt: '',
    updateAt: '',
  },
]

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

  console.log(games)

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
          {testData.map(game => (
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
                    onClick={() => router.push(`/games/${game.id}`)}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Layout>
  )
}
