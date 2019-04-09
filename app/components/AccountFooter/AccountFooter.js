import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route, Redirect } from 'react-router'
import './style.scss';

class AccountFooter extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(){
    super();
    this.state = {
      session: {
        active: false,
      },
    }
  }

  tab1(){
    //document.querySelector(".Header .centered a").href="/feed/tab1"
    document.querySelector(".Principal").className="Principal tab1"
  }

  tab2(){
    //document.querySelector(".Header .centered a").href="/feed/tab2"
    document.querySelector(".Principal").className="Principal tab2"
  }

  
  render() {
    return(
        <div className="PrincipalFooter Footer">
            <Link className="ButtonF" to="/feed/tab1" >
                <FontAwesomeIcon icon="warehouse" style={{cursor:'pointer'}} />
            </Link>
            <Link className="ButtonF" to="/feed/tab2" >
                <FontAwesomeIcon icon="newspaper" style={{cursor:'pointer'}} />
            </Link>
            <Link className="ButtonF" to="/account" style={{filter: 'brightness(50%)'}}>
                <FontAwesomeIcon icon="user" style={{cursor:'pointer'}} />
            </Link>
        </div>
    )
  }
}
export default AccountFooter;