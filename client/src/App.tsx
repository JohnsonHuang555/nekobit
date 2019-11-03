import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheckSquare,
  faUser,
  faLock,
  faCrown,
} from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/Navbar';
import Home from './containers/Home';
import NewRoom from './containers/NewRoom';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Game from './containers/Game';
import Room from './containers/Room';

import AppContextProvider from './contexts/AppContext';

library.add(faCheckSquare, faUser, faLock, faCrown);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <AppContextProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/newroom" component={NewRoom} />
            <Route path="/game/:gameName" component={Game} />
            <Route path="/room/:id" component={Room} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </AppContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
