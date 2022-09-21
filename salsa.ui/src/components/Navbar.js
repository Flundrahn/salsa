import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../auth/initFirebase';
import { AuthContext } from './AuthContext';
import constants from '../constants';
import '../styles/Navbar.css';

function Navbar() {
  const { currentUser } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    navigate('/', { replace: true });
  };

  return (
    <div className="navbar-container">
      <div className="logo">
        <Link to="/"><img src="../salt-logo.svg" alt="salt-logo" /></Link>
      </div>
      {currentUser ? (
        <>
          <div className="navbar">
            {
            React.Children.toArray(
              constants.RESOURCE_TYPES.map(r => (
                <Link
                  to={`resource/${r}`}
                  className="navbar-item"
                >
                  <p className="item__text">{` ${r}s`}</p>
                  <div className="item__line" />
                </Link>
              )),
            )
            }
            <Link
              to="search"
              className="navbar-item"
            >
              <p className="item__text">Search All</p>
              <div className="item__line" />
            </Link>
          </div>
          <div className="user-information">
            <img src={auth.currentUser.photoURL} alt="" className="user-information__photo" />
            {auth.currentUser.displayName}
          </div>
          <button type="submit" className="google-btn google-btn__logout" onClick={logout}>
            sign out
          </button>
        </>
      ) : (
        <>
        </>
      )}
    </div>
  );
}

export default Navbar;
