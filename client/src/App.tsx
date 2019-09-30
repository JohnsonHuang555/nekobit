import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faUser, faLock } from '@fortawesome/free-solid-svg-icons';

import Navbar from './components/Navbar';
import Home from './containers/Home';
import NewRoom from './containers/NewRoom';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Game from './containers/Game';
import Room from './containers/Room';

library.add(faCheckSquare, faUser, faLock);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/newroom" component={NewRoom} />
          <Route path="/game/:id" component={Game} />
          <Route path="/room/:id" component={Room} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          {/* <UserContextProvider>
            <GameContextProvider>
              <RoomContextProvider>
              </RoomContextProvider>
            </GameContextProvider>
          </UserContextProvider> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
