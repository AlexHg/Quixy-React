import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route, Redirect } from 'react-router'
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  
  newspaperBtnOffCanvas = (e) => {
    e.preventDefault();
    if (document.querySelector("[data-offcanvas]") == null) 
      //Si no hay offCanvas
      window.location = "/";

    var canvas = document.querySelector("[data-offcanvas]")
    if(canvas.dataset.offcanvas == 'true') 
      //Si hay offCanvas y está escondido
      canvas.dataset.offcanvas = false;
    else
      //Si hay offCanvas y se muestra
      canvas.dataset.offcanvas = true;
      
  }

  render() {
    return (
      <div className="header">
        <h3 className="centered">
          <span className="newspaperBtn">
            <FontAwesomeIcon icon="newspaper" style={{cursor:'pointer'}} onClick={this.newspaperBtnOffCanvas} />&nbsp;&nbsp;
          </span>
          Quixy P2
        </h3>
        
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

        <div className="nav-mobile">
        <FontAwesomeIcon icon="bars" style={{cursor:'pointer'}} />
        </div>
      </div>
    );
  }
}

export default Header;
