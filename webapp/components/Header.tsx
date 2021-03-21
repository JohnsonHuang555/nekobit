import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from 'selectors/appSelector';
import { setUserInfo } from 'slices/appSlice';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'domain/models/User';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import LoginModal from './modals/LoginModal';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const { userInfo } = useSelector(selectUserInfo);

  const onLogin = (name: string) => {
    const user: User = {
      id: uuidv4(),
      name,
    };
    localStorage.setItem('userInfo', JSON.stringify(user));
    dispatch(setUserInfo(user));
    setShowLoginModal(false);
  };

  const changeRoute = (url: string) => {
    router.push(url);
  };

  return (
    <>
      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSubmit={(name) => onLogin(name)}
      />
      <AppBar position="static">
        <Toolbar>
          {/* TODO: LOGO */}
          <Typography variant="h6" style={{ marginRight: '15px' }}>
            nekobit
          </Typography>
          <div style={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={() => changeRoute('/')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => changeRoute('/games')}>
              Games
            </Button>
            <Button color="inherit" onClick={() => changeRoute('/')}>
              About
            </Button>
          </div>
          {userInfo ? (
            <>
              <Typography variant="h6">歡迎！{userInfo.name}</Typography>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => setShowLoginModal(true)}>
                Login
              </Button>
              {/* <Button color="inherit">Get Start</Button> */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
