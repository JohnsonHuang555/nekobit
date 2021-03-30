import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { wrapper } from 'store';
import { loadGames } from 'actions/GameAction';
import { END } from 'redux-saga';
import { gamesSelector } from 'selectors/GameSelector';

function Home() {
  const games = useSelector(gamesSelector);
  console.log(games);
  return <Button>123</Button>;
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (!store.getState().games) {
    store.dispatch(loadGames());
    store.dispatch(END);
  }

  await store.sagaTask.toPromise();
});

export default Home;
