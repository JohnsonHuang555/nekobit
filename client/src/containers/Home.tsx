import React, { useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { TGame } from '../types/Game';
import Swiper from 'react-id-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../assets/styles/home.scss';

const Home = (props: RouteComponentProps) => {
  const { games } = useContext(AppContext);

  const chooseGameHandler = (id: string) => {
    props.history.push(`/game/${id}`);
  };

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

  return (
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
                  <img className="game-image" src={game.imgURL} alt="象棋" width="100%" />
                  <div className="game-block">
                    <div className="center">
                      <h2>{game.name}</h2>
                      <button className="game-enter" onClick={() => chooseGameHandler(game._id)}>Enter</button>
                      <div className="rates">
                        <div className="stars">
                          <FontAwesomeIcon icon="star" />
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
  )
}

export default Home;
