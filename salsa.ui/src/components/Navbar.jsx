import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../auth/initFirebase';
import { Link } from 'react-router-dom';
import GoogleButton from './GoogleButton';
import { AuthContext } from './AuthContext';
import '../styles/Navbar.css';
import { RESOURCE_TYPES } from '../constants';

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    navigate('/', { replace: true });
  };

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="../salt-logo.svg" alt="salt-logo" />
        </Link>
      </div>
      {currentUser && (
        <>
          <nav className="navbar__link-container">
            {React.Children.toArray(
              RESOURCE_TYPES.map(r => (
                <Link to={`resource/${r}`} className="navbar-item">
                  <p className="item__text">{` ${r}s`}</p>
                  <div className="item__line" />
                </Link>
              ))
            )}
            <Link to="search" className="navbar-item">
              <p className="item__text">Search All</p>
              <div className="item__line" />
            </Link>
          </nav>
          <div className="user-information">
            <img
              src={auth.currentUser.photoURL}
              alt=""
              className="user-information__photo"
            />
            {auth.currentUser.displayName}
            <GoogleButton
              label="sign out"
              handleClick={logout}
              className="google-btn--logout"
            />
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
