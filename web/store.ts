import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import rootReducer from 'reducers/rootReducer';
import rootSaga from 'sagas/rootSaga';
import createSagaMiddleware from 'redux-saga';
import websocketMiddleware from 'sockets/index';

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  } else {
    return rootReducer(state, action);
  }
};

const initStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, bindMiddleware([sagaMiddleware, websocketMiddleware]));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(initStore);
