import { NextPage } from 'next';
import { TGame } from '../types/Game';
import Router from 'next/router'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swiper from 'react-id-swiper';
import GameApi from '../api/GameApi';

import "../styles/index.scss";
import Layout from '../components/Layout';

const Home: NextPage<{ games: TGame[] }> = ({ games = [] }) => {
  const SwiperParams = {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  };

  const chooseGameHandler = (id: string) => {
    Router.push({
      pathname: '/game',
      query: {
        id
      }
    })
  };

  return (
    <Layout>
      <div id="home">
        <div className="container">
          <div className="section-heading">
            <h2>All Games</h2>
          </div>
          <div className="lobby_box">
            <Swiper {...SwiperParams} shouldSwiperUpdate>
              {games.map((game: TGame) => (
                <div key={game._id}>
                  <div className="game-card">
                    <img className="game-image" src={game.imgURL} alt={game.name} width="100%" height="100%" />
                    <div className="game-block">
                      <div className="center">
                        <h2>{game.name}</h2>
                        <button className="game-enter" onClick={() => chooseGameHandler(game._id)}>Enter</button>
                        <div className="rates">
                          <div className="stars">
                            <FontAwesomeIcon icon={faStar} />
                            <b>9.5 分</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </Layout>
  )
};

Home.getInitialProps = async () => {
  const games = await GameApi.getAllGames();
  return { games }
};

export default Home;
