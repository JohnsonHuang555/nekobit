import React from 'react';
import Router from 'next/router';
import { Box } from '@material-ui/core';
import Layout from 'src/components/Layout';
import { TGame } from 'src/features/main/domain/models/Game';
import { IndexContract } from 'src/features/main/Index/IndexContract';
import { IndexPresenter } from 'src/features/main/Index/IndexPresenter';
import { Injection } from 'src/features/main/Index/injection/injection';
import GameList from 'src/features/main/Index/components/GameList';
import styles from '@styles/pages/index.module.scss';

interface IndexViewProps {}
interface IndexViewState {
  games: TGame[];
}

class IndexView extends React.Component<IndexViewProps, IndexViewState>
  implements IndexContract.View {

  private presenter: IndexContract.Presenter;

  constructor(props :IndexViewProps) {
    super(props);

    this.state = {
      games: [],
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
    } = this.state;

    return (
      <Layout id={styles.home}>
        <Box className="section-heading">
          <h2>All Games</h2>
        </Box>
        <GameList
          games={games}
          onChooseGame={(id) => this.chooseGameHandler(id)}
        />
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
