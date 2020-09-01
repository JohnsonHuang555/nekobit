import React, { useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@material-ui/core';
import Layout from 'src/components/Layout';
import GameList from 'src/features/main/Index/components/GameList';
import { ActionType as IndexActionType } from 'src/features/main/reducers/indexReducer';
import { ActionType as AppActionType } from 'src/reducers/appReducer';
import { gamesSelector } from 'src/features/main/selectors';
import GameBoy from 'src/features/main/Index/components/GameBoy';
import styles from '@styles/index.module.scss';

const IndexContainer = () => {
  const dispatch = useDispatch();
  const games = useSelector(gamesSelector);

  useEffect(() => {
    dispatch({ type: IndexActionType.GET_GAMES });
    dispatch({ type: AppActionType.GET_USER_INFO });
  }, []);

  const chooseGameHandler = (id: string) => {
    Router.push({
      pathname: '/game',
      query: { id }
    });
  };

  return (
    <Layout>
      <Grid className={styles['index']} container>
        <Grid item xs={6}>
          <GameBoy />
        </Grid>
        <Grid item xs={6}>
          game data
        </Grid>
      </Grid>
      {/* <GameList
        games={games}
        onChooseGame={(id) => chooseGameHandler(id)}
      /> */}
    </Layout>
  )
};

export default IndexContainer;
