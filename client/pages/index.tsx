import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Layout from 'components/Layout';
import styles from 'styles/components/home.module.scss';
import { Game } from 'features/index/domain/models/Game';

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
]

export default function Home() {
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
          slidesPerView={6}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {testData.map(game => (
            <SwiperSlide>
              <img
                src={`${game.imgUrl}/home.png`}
                alt={game.name}
                width="100%"
                height="100%"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Layout>
  )
}
