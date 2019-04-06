/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';

import NewsCard from 'components/NewsCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {apiRestHost,apiRestHostDev} from '../../server.json';
import http from 'http';

import './style.scss';

var elementClicked;
export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(){
    super();
    this.state = {
      session: {},
      busqueda: "",
      resultados: [], 
      searchAwait: false,

    };
  }
  shouldComponentUpdate() {return true}
  componentWillMount() { 
    fetch("http://"+window.location.hostname+':8080/api/newscards/')
      .then((response) => {
        return response.json()
      }).then((newscards) => {
        //console.log(JSON.stringify(newscards[0]));
        this.setState({ resultados: newscards })
      })

    return "cargando...";
  };

  componentDidMount(){
    //this.listenLinks();
    setTimeout(
      ()=> document.querySelector('.NewsCardFeed').className += " mounted",
      200
    )
  }

  listenLinks(){
    var parent = document.querySelector('.NewsCardFeed');
    parent.addEventListener('click', function (event) {
        console.log(event.target.tagName)
        if (event.target.tagName == 'A') {
            console.log(event.target.closest(".NewsCard"));
            elementClicked = event.target.closest(".NewsCard");
            
            //parent.removeChild(event.target);
        }
    }, false);
  }

  componentWillUnmount(){
    /*this.setState({scroll: document.querySelector('.NewsCardFeed').offsetTop})
    console.log(document.querySelector('.NewsCardFeed').offsetTop)*/
    document.querySelector('.NewsCardFeed').className += " unmounting";
  }

  componentDidUpdate(){
    //console.log(this.state.elementClicked)
  }
  addElementClicked(target){
    //console.log(target)
    
    this.setState({elementClicked: target})
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
        
        {this.state.resultados.map( (resultado, i) => <NewsCard key={"NewsCard-"+i} params={resultado} /> )}
      </div>
    );
  }
}


