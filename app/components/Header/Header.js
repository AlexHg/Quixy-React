import React from 'react';
import { Link } from 'react-router-dom';
import Banner from './images/banner.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route, Redirect } from 'react-router'
import './style.scss';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(){
    super();
    this.state = {
      session: {
        active: false,
      },
    }
  }

  componentWillMount(){    
    setInterval(()=>{
      if(sessionStorage.getItem("session") != undefined ) {
        if(JSON.parse(sessionStorage.getItem("session")).active != this.state.session.active){
          this.setState({session: JSON.parse(sessionStorage.getItem("session"))})
        }
      }else{
        this.setState({session: {active:false}})
      }
    }, 500);
  }

  newspaperBtnOffCanvas = (e) => {
    e.preventDefault();
    if (document.querySelector("[data-offcanvas]") == null) 
      //Si no hay offCanvas
      window.location = "/";
      //this.forceUpdate(<Redirect to='/' />);

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
            <FontAwesomeIcon icon="newspaper" style={{cursor:"pointer"}} onClick={this.newspaperBtnOffCanvas} />&nbsp;&nbsp;
          </span>
          Quixy P2
        </h3>
        <div className="rightside">
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
            
            {!this.state.session.active &&
              <Link className="router-link" to="/sesion">
                Iniciar sesión
              </Link>
            }

            {this.state.session.active &&
              <Link className="router-link" to="/logout">
                Cerrar sesión
              </Link>
            }
            
          </div>
          {this.state.session.active && (
            <label className="profilem" htmlFor="profile-menu-launcher">
              <img src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"/>
            </label>
          )}
          
        </div>
        <div className="nav-mobile">
          <FontAwesomeIcon icon="bars" style={{cursor:'pointer'}} />
        </div>
        
        <input type="checkbox" id="profile-menu-launcher"/>
        <div className="profile-menu"></div>
      </div>
    );
  }
}

export default Header;
