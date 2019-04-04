/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';

import NewsCard from 'components/NewsCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {apiRestHost,apiRestHostDev} from '../../server.json';
import http from 'http';

import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(){
    super();
    this.state = {
      session: {},
      busqueda: "",
      resultados: [], 
      searchAwait: false,
    };
  }
  
  componentWillMount() { 
    fetch("http://"+window.location.hostname+':8080/api/newscards/')
      .then((response) => {
        return response.json()
      }).then((newscards) => {
        console.log(JSON.stringify(newscards[0]));
        this.setState({ resultados: newscards })
      })

    return "cargando...";
  };

  componentDidMount(){
    setTimeout(
      ()=> document.querySelector('.NewsCardFeed').className += " mounted",
      200
    )
  }

  componentWillUnmount(){
    document.querySelector('.NewsCardFeed').className += " unmounting";
  }

  render() { 
    return (
      <div className="NewsCardFeed" data-offcanvas="true" >
        <Helmet>
          <title>Nuevas noticias</title>
          <meta
            name="description"
            content="Nuevas noticias - Quixy | Plataforma de noticias inteligente"
          />
        </Helmet>
        
        {this.state.resultados.map( (resultado, i) => <NewsCard key={"NewsCard-"+i} params={resultado}/> )}
      </div>
    );
  }
}


