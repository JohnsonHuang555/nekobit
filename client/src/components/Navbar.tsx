import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import '../assets/styles/navbar.scss'

const Navbar = () => {
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
            <NavLink className="nav-item nav-link" to="/signin">Login</NavLink>
            <NavLink className="nav-item nav-link" to="/signup">Sign Up</NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Navbar);
