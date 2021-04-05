import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper } from 'store';
import { loadGames } from 'actions/GameAction';
import { END } from 'redux-saga';
import { gamesSelector } from 'selectors/GameSelector';
import { wsConnect } from 'actions/WebSocketAction';

function Home() {
  const dispatch = useDispatch();
  const games = useSelector(gamesSelector);
  useEffect(() => {
    dispatch(wsConnect('ws://localhost:5000/ws/123'));
  }, []);
  return <Button>333</Button>;
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  if (!store.getState().games) {
    store.dispatch(loadGames());
    store.dispatch(END);
  }

  await store.sagaTask.toPromise();
});

export default Home;
