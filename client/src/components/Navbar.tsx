import React, { useContext, useState, useEffect } from 'react';
import uuid from 'uuid';
import LoginModal from '../components/LoginModal';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import {AppContext} from '../contexts/AppContext';

import '../assets/styles/navbar.scss';

const Navbar = (props: RouteComponentProps) => {
  const [isShowLoginModal, setIsShowLoginModal] = useState(false);
  const {
    userInfo,
    setUserInfo
  } = useContext(AppContext);

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
    props.history.push('/');
  };

  return (
    <>
      <LoginModal
        show={isShowLoginModal}
        login={login}
        onCloseLogin={onCloseLogin}
      />
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <NavLink className="logo" to="/">
            <b className="g">G</b>
            <b className="play">play</b>
          </NavLink>
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link active" to="/">Home</NavLink>
            <NavLink className="nav-item nav-link" to="/newroom">NewRoom</NavLink>
            { !userInfo ? (
              <>
                <a onClick={onLogin} href="javacript: void();">Login</a>
                <NavLink className="nav-item nav-link" to="/signup">SignUp</NavLink>
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

export default withRouter(Navbar);
