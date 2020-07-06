import { call, put, takeEvery } from 'redux-saga/effects';
import appProvider from 'src/provider/AppProvider';
import { MainProvider } from '../domain/Provider';
import { TGame } from '../domain/models/Game';
import { ActionType as IndexActionType } from '../reducers/indexReducer';

function* fetchData() {
  const data: TGame[] = yield call(() =>
    appProvider.useCaseHandler.execute(MainProvider.GetGamesUseCase, {}, {
      onSuccess: ({ games }) => {
        return games;
      },
      onError: () => {}
    })
  );
  yield put({ type: IndexActionType.GamesLoaded, payload: { data } });
}

function* indexSaga() {
  yield takeEvery(IndexActionType.GamesLoaded, fetchData);
}

export default indexSaga;
