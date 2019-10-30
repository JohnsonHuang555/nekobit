import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <NavLink className="navbar-brand" to="/">LOGO</NavLink>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link active" to="/">Home</NavLink>
            <NavLink className="nav-item nav-link" to="/newroom">NewRoom</NavLink>
            {/* <NavLink className="nav-item nav-link" to="/signin">SignIn</NavLink> */}
            {/* <NavLink className="nav-item nav-link" to="/signup">SignUp</NavLink> */}
          </div>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Navbar);
