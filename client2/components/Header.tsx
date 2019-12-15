import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router'
import uuid from 'uuid';
import LoginModal from './Modals/LoginModal';
import useLocalStorage from '../customHook/useLocalStorage';
import '@styles/header.scss';

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
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link href="/">
            <a className="logo">
              <b className="g">G</b>
              <b className="play">play</b>
            </a>
          </Link>
          <div className="navbar-nav">
            <Link href="/">
              <a className="nav-item nav-link active">Home</a>
            </Link>
            <Link href="/newroom">
              <a className="nav-item nav-link">NewRoom</a>
            </Link>
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
                    <img />
                  </div>
                  <b className="name">{userInfo.name}</b>
                  <div className="down">
                    <button onClick={logout}>Logout</button>
                  </div>
                </div>
                <b className="at">在<span>西洋棋</span>大廳</b>
              </div> )
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header;
