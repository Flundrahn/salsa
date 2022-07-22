import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ValueContext } from './ValueContext';
import './styles/Navbar.css';

function Navbar() {
  const { resourceTypes } = useContext(ValueContext);

  return (
    <div className="navbar-container">
      <div className="logo">
        <img src="salt-logo.svg" alt="salt-logo" />
      </div>
      <div className="navbar">
        {
          React.Children.toArray(
            resourceTypes.map(r => (
              <Link
                to={`resource/${r.toLowerCase()}`}
                className="navbar-item">
                {` ${r}s`}
              </Link>
            )),
          )
          }
      </div>
      <div className="user-information">
        <img src="user-photo.svg" alt="" className="user-information__photo" />
        Justina Hamphrey
      </div>
    </div>
  );
}

export default Navbar;
