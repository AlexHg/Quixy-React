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
export default class NewsCardFeed extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor({params}){
    super();
    this.state = {
      session: {},
      busqueda: "",
      resultados: [], 
      searchAwait: false,
      pageCount: 0,
      newPage: false,
    };
    //this.pageCount = props.params.pageCount;
    //console.log(params)
  }
  shouldComponentUpdate() {return true}
  componentWillReceiveProps({params}){
    //console.log(params)
    if(params.pageCount > this.state.pageCount)
      this.setState({pageCount: params.pageCount, newPage: true});
  }
  componentDidUpdate(){
    var getMoreNC = document.querySelector("#getMoreNC.available");
    if(this.state.newPage){
      fetch("http://"+window.location.hostname+':8080/api/newscards/8/'+this.state.pageCount)
      .then((response) => {
        return response.json()
      }).then((newscards) => {
        if(newscards.length == 0){
          getMoreNC.classList="notAvaliable"
        }

        this.setState({newPage: false, resultados: this.state.resultados.concat(newscards) })
      })
    }
    //console.log(this.state.elementClicked)
  }
  componentWillMount() { 
    fetch("http://"+window.location.hostname+':8080/api/newscards/8/'+this.state.page)
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

        <div id="getMoreNC" className="available"></div>
      
      </div>
    );
  }
}


