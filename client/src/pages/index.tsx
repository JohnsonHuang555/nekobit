import React, { useEffect } from 'react';
import Router from 'next/router';
import { Box } from '@material-ui/core';
import Layout from 'src/components/Layout';
import { TGame } from 'src/features/main/domain/models/Game';
import GameList from 'src/features/main/Index/components/GameList';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from 'src/features/main/reducers/indexReducer';
import { gamesSelector } from 'src/features/main/selectors';

// interface IndexViewProps {}
// interface IndexViewState {
//   games: TGame[];
// }

const IndexContainer = () => {
  const dispatch = useDispatch();
  const games = useSelector(gamesSelector);

  useEffect(() => {
    dispatch({ type: ActionType.GET_GAMES });
  }, []);

  const chooseGameHandler = (id: string) => {
    Router.push({
      pathname: '/game',
      query: { id }
    });
  };

  return (
    <Layout>
      <Box className="section-heading">
        <h2>All Games</h2>
      </Box>
      <GameList
        games={games}
        onChooseGame={(id) => chooseGameHandler(id)}
      />
    </Layout>
  )
};

export default IndexContainer;

// class IndexView extends React.Component<IndexViewProps, IndexViewState>
//   implements IndexContract.View {

//   private presenter: IndexContract.Presenter;

//   constructor(props: IndexViewProps) {
//     super(props);

//     this.state = {
//       games: [],
//     };

//     this.presenter = new IndexPresenter(
//       this,
//       Injection.provideUseCaseHandler(),
//       Injection.provideGetGamesUseCase(),
//     )
//   }

//   componentDidMount() {
//     this.presenter.mount();
//   }

//   render() {
//     const {
//       games,
//     } = this.state;

//     return (
//       <Layout>
//         <Box className="section-heading">
//           <h2>All Games</h2>
//         </Box>
//         <GameList
//           games={games}
//           onChooseGame={(id) => this.chooseGameHandler(id)}
//         />
//       </Layout>
//     )
//   }

//   nowLoading(): void {

//   }

//   finishLoading(): void {

//   }

//   setGames(games: TGame[]): void {
//     this.setState({ games });
//   }

//   private chooseGameHandler(id: string) {
//     Router.push({
//       pathname: '/game',
//       query: { id }
//     });
//   }
// }

// export default IndexView;
