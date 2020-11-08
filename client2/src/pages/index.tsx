import React, { useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import Layout from 'src/components/Layout';
import GameList from 'src/features/main/Index/components/GameList';
import { ActionType as IndexActionType } from 'src/features/main/reducers/indexReducer';
import { ActionType as AppActionType } from 'src/reducers/appReducer';
import { gamesSelector } from 'src/features/main/selectors';
import styles from '@styles/pages/index.module.scss';

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
      <Box
        className={styles['background-image']}
        style={{ backgroundImage: "url('img/intro.jpg')" }}
      />
      <Box className={styles['game-intro']}>
        <Box className={styles['game-title']}>
          熱門遊戲
        </Box>
        <Box className={styles['game-description']}>
          歡迎來到 Gplay ，免費遊玩各式桌遊喔 ^^
        </Box>
      </Box>
      <GameList
        games={games}
        onChooseGame={(id) => chooseGameHandler(id)}
      />
    </Layout>
  )
};

export default IndexContainer;
