import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <h1 className="centered">Prototipo 0.1</h1>
        
        <div className="nav-bar">
          <Link className="router-link" to="/">
            Home
          </Link>
          <Link className="router-link" to="/busqueda">
            Busqueda
          </Link>
          <Link className="router-link" to="/feed">
            Feed
          </Link>

        </div>
      </div>
    );
  }
}

export default Header;
