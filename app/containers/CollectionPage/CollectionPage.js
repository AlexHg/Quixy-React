/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Link} from "react-router-dom";
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';

import NewsCard from 'components/NewsCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {apiRestHost,apiRestHostDev} from '../../server.json';
import http from 'http';

import './style.scss';

export default class CollectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor({match}){
    super();
    this.state = {
      slug: match.params.slug,
      slugChange: false,
      session: {},
      busqueda: "",
      resultados: [], 
      searchAwait: false,

    };
  }
  shouldComponentUpdate() {return true}

  componentDidMount(){
    setTimeout(
      ()=> document.querySelector('.CollectionPage').className += " mounted",
      200
    )
    ReactDOM.findDOMNode(this).scrollIntoView(false);
  }
  componentDidUpdate(){
    if(this.state.slugChange) this.mountData();
  }
  componentWillMount() { 
    this.mountData();
    return "cargando...";
  };

  mountData(){
    fetch("http://"+window.location.hostname+':8080/api/newscards/')
      .then((response) => {
        return response.json()
      }).then((newscards) => {
        //console.log(JSON.stringify(newscards[0]));
        this.setState({ resultados: newscards, slugChange:false})
      })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.slug != this.state.slug){
      this.setState({slug: nextProps.match.params.slug, slugChange: true})
    }
  }


  listenLinks(){
    var parent = document.querySelector('.CollectionPage');
    parent.addEventListener('click', function (event) {
        console.log(event.target.tagName)
        if (event.target.tagName == 'A') {
            console.log(event.target.closest(".NewsCard"));
            elementClicked = event.target.closest(".NewsCard");
            
            //parent.removeChild(event.target);
        }
    }, false);
  }

  render() { 
    return (
      <div className="CollectionPage" data-offcanvas="true" >
        <Helmet> 
          <title>Nuevas noticias</title>
          <meta
            name="description"
            content="Nuevas noticias - Quixy | Plataforma de noticias inteligente"
          />
        </Helmet>
        <div className="CollectionPageHeader" >
          <div className="CPHImage">
            <img src="https://cdn2.excelsior.com.mx/media/storage/elchapo_0.jpg"/>
          </div>
          <div className="CPHContent">
            <div className="CPHInfo">
              <h1 className="CPHTitle">{this.state.slug.replace(/-/g, ' ')}</h1>
              <p>La Agencia Central de Inteligencia (CIA, por sus siglas en inglés), planeaba una “operación de desestabilización” al gobierno de Luis Echeverría en 1975, según Helen Jordan, identificada como integrante del Partido Socialista Laborista de Estados Unidos, revela un informe de la extinta Dirección Federal de Seguridad (DFS).</p>
            </div>
            <div className="CPHFooter">
              <div className="FooterLeft Actions">
                <button className="actionBtn">
                  <FontAwesomeIcon icon="thumbs-up"/> 0
                </button>
                <button className="actionBtn">
                  <FontAwesomeIcon icon="star"/> 0
                </button>
                <button className="actionBtn">
                  <FontAwesomeIcon icon="share-alt"/> 0
                </button>

              </div>
              <div className="FooterRight Actions">
                <button className="actionBtn CompleteNew"><FontAwesomeIcon icon="bell"/> Suscribirse</button>
              </div>
            </div>
          </div>
          
          
        </div>
        <h3 className="NewCounter">Noticias (53)</h3>
        {this.state.resultados.map( (resultado, i) => <NewsCard key={"NewsCard-"+i} params={resultado} /> )}
      </div>
    );
  }
}


