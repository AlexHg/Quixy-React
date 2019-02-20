import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="header">
        <h3 className="centered">Quixy P2</h3>
        
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
          <Link className="router-link" to="/sesion">
            Cerrar sesion
          </Link>

        </div>
      </div>
    );
  }
}

export default Header;
