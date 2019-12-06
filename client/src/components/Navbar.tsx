import React, { useContext } from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import {AppContext} from '../contexts/AppContext';

import '../assets/styles/navbar.scss';

const Navbar = (props: RouteComponentProps) => {
  const {
    userInfo,
    setUserInfo
  } = useContext(AppContext);
  const logout = () => {
    setUserInfo(null);
    props.history.push('/');
  };
  return (
    <>
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
                <a href="javacript: void();">Login</a>
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
