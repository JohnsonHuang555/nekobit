import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import uuid from 'uuid';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { userInfoSelector } from 'src/selectors';
import { ActionType as AppActionType } from 'src/reducers/appReducer';
import styles from '@styles/components/header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInfoSelector);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userName, setUserName] = useState('');

  const onLogin = () => {
    dispatch({
      type: AppActionType.SET_USER_INFO,
      userInfo: {
        id: uuid(),
        name: userName,
      },
    });
    setShowLoginModal(false);
  };

  const onLogout = () => {
    dispatch({
      type: AppActionType.SET_USER_INFO,
      isLogout: true,
    });
    Router.push('/');
  };

  return (
    <>
      <Dialog
        fullWidth
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        aria-labelledby="login-modal"
      >
        <DialogTitle id="login-modal">登入</DialogTitle>
        <DialogContent>
          <Box marginBottom={2}>
            <TextField
              required
              fullWidth
              label="暱稱"
              placeholder="請輸入您的暱稱"
              variant="outlined"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setShowLoginModal(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onLogin()}
            color="primary"
            disabled={!userName ? true : false}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>
      <AppBar position="static" className={styles.header}>
        <Toolbar>
          <Typography variant="h6" className={styles.logo}>
            <Link href="/">
              <a>
                <span className={styles.g}>G</span>
                <span className={styles.play}>play</span>
              </a>
            </Link>
          </Typography>
          {!userInfo ? (
            <Button
              color="inherit"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </Button>
          ) : (
            <Box display="flex" alignItems="center">
              <img className={styles.image} src="https://images.pexels.com/photos/3393375/pexels-photo-3393375.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
              <Box className={styles.name}>
                {userInfo.name}
              </Box>
              <Button
                color="inherit"
                onClick={() => onLogout()}
              >
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header;
