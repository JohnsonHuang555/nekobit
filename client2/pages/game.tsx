import React from 'react';
import { withRouter } from 'next/router';
import { WithRouterProps } from 'next/dist/client/with-router';
import Layout from "../components/Layout/Layout";
import "../styles/game.scss";

const Game = ({ router }: WithRouterProps) => {
  return (
    <Layout>
      <div className="game">Game page {router.query.id}</div>
    </Layout>
  )
}

export default withRouter(Game);
