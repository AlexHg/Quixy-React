import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import NewsCard from 'components/NewsCard';
import Collection from 'components/Collection';
import BreakingNew from 'components/BreakingNew';
import qwest from 'qwest';
//import {noticias} from '../../dataold.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import http from 'http';

import './style.scss';

export default class NewsCardPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor({match}){
    super();
    this.state = {
      slug: match.params.slug,
      session: JSON.parse(sessionStorage.getItem("session")),
      busqueda: "",
      resultados: [], 
      searchAwait: false,
    };
  }
  componentWillMount() {
    
    console.log(this.state.slug, this.state.session)
  }
  render() {
    const { state = {} } = location;
    const { modal } = state;
    return (
      <div className="ModalViewerContainer" style={{height:"5000px"}}>
          <div className="ModalViewer">
              
              <h1>{this.state.slug}</h1>
            
          </div>
      </div>
    )
  }
}
