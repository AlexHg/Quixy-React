import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route, Redirect } from 'react-router'
import './style.scss';

class PrincipalFooter extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor({match}){
    super();
    this.state = {
      session: {
        active: false,
      },
    }
    //console.log("match",match)
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
            <div className="ButtonF" id="tab1" onClick={this.tab1}>
                <FontAwesomeIcon icon="warehouse" style={{cursor:'pointer'}} />
            </div>
            <div className="ButtonF" id="tab2" onClick={this.tab2}>
                <FontAwesomeIcon icon="newspaper" style={{cursor:'pointer'}} />
            </div>
            <Link className="ButtonF" to="/session">
                <FontAwesomeIcon icon="user" style={{cursor:'pointer'}} />
            </Link>
        </div>
    )
  }
}
export default PrincipalFooter;