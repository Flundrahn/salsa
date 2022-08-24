import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ValueContext } from './ValueContext';
import './styles/Navbar.css';
import {
  auth,
} from '../auth/firebase-configs';

function Navbar() {
  const { resourceTypes, currentUser } = useContext(ValueContext) || {};
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
              resourceTypes.map(r => (
                <Link
                  to={`resource/${r.toLowerCase()}`}
                  className="navbar-item">
                  <p className="item__text">{` ${r}s`}</p>
                  <div className="item__line" />
                </Link>
              )),
            )
          }
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
