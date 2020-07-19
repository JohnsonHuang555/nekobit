import React, { useEffect } from 'react';
import Router from 'next/router';
import { Box } from '@material-ui/core';
import Layout from 'src/components/Layout';
import GameList from 'src/features/main/Index/components/GameList';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from 'src/features/main/reducers/indexReducer';
import { gamesSelector } from 'src/features/main/selectors';

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
