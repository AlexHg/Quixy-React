import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Route, Redirect } from 'react-router'
import './style.scss';

class Footer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(){
    super();
    this.state = {
      session: {
        active: false,
      },
    }
  }

  render() {
    return(
        <div className="Footer">
            <div className="ButtonF">
                <FontAwesomeIcon icon="newspaper" style={{cursor:'pointer'}} />
            </div>
            <div className="ButtonF">
                <FontAwesomeIcon icon="newspaper" style={{cursor:'pointer'}} />
            </div>
            <div className="ButtonF">
                <FontAwesomeIcon icon="user" style={{cursor:'pointer'}} />
            </div>
        </div>
    )
  }
}
export default Footer;