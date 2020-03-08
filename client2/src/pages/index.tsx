import React from 'react';
// import { NextPage } from 'next';
import Swiper from 'react-id-swiper';
import Router from 'next/router';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Layout from 'src/components/Layout';
import Button from 'src/components/Shared/Button';
// import GameApi from 'src/api/GameApi';
// import { TGame } from 'src/types/Game';
import '@styles/pages/index.scss';
import { TGame } from 'src/features/games/domain/models/Game';
import { IndexContract } from 'src/features/games/Index/IndexContract';
import { IndexPresenter } from 'src/features/games/Index/IndexPresenter';
import { Injection } from 'src/features/games/Index/injection/injection';

interface IndexViewProps {}

interface IndexViewState {
  games: TGame[];
  swiperParams: any;
}

class IndexView extends React.Component<IndexViewProps, IndexViewState>
  implements IndexContract.View {

  private presenter: IndexContract.Presenter;

  constructor(props :any) {
    super(props);

    this.state = {
      games: [],
      swiperParams: {
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
      }
    };

    this.presenter = new IndexPresenter(
      this,
      Injection.provideUseCaseHandler(),
      Injection.provideGetGamesUseCase(),
    )
  }

  componentDidMount() {
    this.presenter.mount();
  }

  render() {
    const {
      games,
      swiperParams,
    } = this.state;

    return (
      <Layout id="home">
        <div className="section-heading">
          <h2>All Games</h2>
        </div>
        <div className="lobby_box">
          <Swiper {...swiperParams} shouldSwiperUpdate>
            {games.map((game: TGame) => (
              <div key={game.id}>
                <div className="game-card">
                  <img
                    className="game-image"
                    src={`${game.imgURL}/home.png`}
                    alt={game.name}
                    width="100%"
                    height="100%"
                  />
                  <div className="game-block">
                    <div className="center">
                      <h2>{game.name}</h2>
                      <Button
                        className="game-enter"
                        title="Enter"
                        onClick={() => this.chooseGameHandler(game.id)}
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
  }

  nowLoading(): void {

  }

  finishLoading(): void {

  }

  setGames(games: TGame[]): void {
    this.setState({ games });
  }

  private chooseGameHandler(id: string) {
    Router.push({
      pathname: '/game',
      query: { id }
    });
  }
}

export default IndexView;
