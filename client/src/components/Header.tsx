import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import uuid from 'uuid';
import LoginModal from 'src/components/Modals/LoginModal';
import useLocalStorage from 'src/customHook/useLocalStorage';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import '@styles/components/header.module.scss';

const Header = () => {
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const [userInfo, setUserInfo] = useLocalStorage('userInfo', null);

  const onLogin = () => {
    setIsShowLoginModal(true);
  };
  const onCloseLogin = () => {
    setIsShowLoginModal(false);
  };

  const login = (name: string) => {
    const userData = {
      name,
      id: uuid(),
      account: "",
      isLogin: true,
    }
    setUserInfo(userData);
    setIsShowLoginModal(false);
  };

  const logout = () => {
    setUserInfo(null);
    Router.push('/');
  };

  useEffect(() => {
    if (!userInfo) {
      setIsShowLoginModal(true);
    }
  }, []);

  return (
    <>
      <LoginModal
        show={isShowLoginModal}
        login={login}
        onCloseLogin={onCloseLogin}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            <Link href="/">
              <a className="logo">
                <b className="g">G</b>
                <b className="play">play</b>
              </a>
            </Link>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {/* <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link href="/">
            <a className="logo">
              <b className="g">G</b>
              <b className="play">play</b>
            </a>
          </Link>
          <div className="navbar-nav">
            { !userInfo ? (
              <>
                <a onClick={onLogin} href="javacript: void();">Login</a>
                <Link href="/signup">
                  <a className="nav-item nav-link">SignUp</a>
                </Link>
              </>
              ) : (
              <div className="member_info">
                <div className="user">
                  <div className="photo">
                    <img src="https://images.pexels.com/photos/3393375/pexels-photo-3393375.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
                  </div>
                  <b className="name">{userInfo.name}</b>
                  <div className="down">
                    <button onClick={logout}>Logout</button>
                  </div>
                </div>
                <span className="at">在<span>西洋棋</span>大廳</span>
              </div> )
            }
          </div>
        </div>
      </nav> */}
    </>
  )
}

export default Header;
