import { wrapper } from 'store';
import { END } from 'redux-saga';
import { loadGameInfo } from 'actions/GameAction';
import { GetStaticPaths } from 'next';

const Game = () => {
  return <div>6666</div>;
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, params }: any) => {
    if (!store.getState().games) {
      store.dispatch(loadGameInfo(params.id));
      store.dispatch(END);
    }

    await store.sagaTask.toPromise();
  }
);

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('test');
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  };
};

export default Game;
