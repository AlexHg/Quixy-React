/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';

export default class SignupPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // load in JSON data from file

  constructor(){
    super();
    
  }
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="feature-page">
        
         sig
      </div>
    );
  }
}
