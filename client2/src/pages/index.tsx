import { NextPage } from 'next';
import Swiper from 'react-id-swiper';
import Router from 'next/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from 'src/components/Layout';
import Button from 'src/components/Shared/Button';
import GameApi from 'src/api/GameApi';
import { TGame } from 'src/types/Game';
import '@styles/pages/index.scss';

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
    });
  };

  return (
    <Layout id="home">
      <div className="section-heading">
        <h2>All Games</h2>
      </div>
      <div className="lobby_box">
        <Swiper {...SwiperParams} shouldSwiperUpdate>
          {games.map((game: TGame) => (
            <div key={game._id}>
              <div className="game-card">
                <img className="game-image" src={`${game.imgURL}/home.png`} alt={game.name} width="100%" height="100%" />
                <div className="game-block">
                  <div className="center">
                    <h2>{game.name}</h2>
                    <Button
                      className="game-enter"
                      title="Enter"
                      onClick={() => chooseGameHandler(game._id)}
                    />
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
    </Layout>
  )
};

Home.getInitialProps = async () => {
  const games = await GameApi.getAllGames();
  return { games }
};

export default Home;
