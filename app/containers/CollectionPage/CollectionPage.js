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
      collection: {
        actions: {
          likes: [],
          shares: [],
          favorites: [],
          subscriptions: [],
        }
      }
    };
  }
  shouldComponentUpdate() {return true}

  componentDidMount(){
    setTimeout(
      ()=>{
        document.querySelector('.CollectionPage').className += " mounted"
        //document.querySelector(".PrincipalFooter #t2").click();
      },
      200
    )
    //ReactDOM.findDOMNode(this).scrollIntoView(false);
    document.querySelector(".PageArea").scrollTop = 0;
    document.querySelector(".PrincipalFooter #tab2").click();
  }
  componentDidUpdate(){

    if(this.state.slugChange){
      this.mountData();
      
    }
    document.querySelector(".PageArea").scrollTop = 0;
    document.querySelector(".PrincipalFooter #tab2").click();
  }
  componentWillMount() { 
    this.mountData();
    return "cargando...";
  };

  mountData(){
    fetch("http://"+window.location.hostname+':8080/api/newscards/get/10/1')
      .then((response) => {
        return response.json()
      }).then((newscards) => {
        //console.log(JSON.stringify(newscards[0]));
        this.setState({ resultados: newscards, slugChange:false})
        //if(this.state.session.active) this.viewHandler();
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
        //console.log(event.target.tagName)
        if (event.target.tagName == 'A') {
            //console.log(event.target.closest(".NewsCard"));
            elementClicked = event.target.closest(".NewsCard");
            
            //parent.removeChild(event.target);
        }
    }, false);
  }

  viewHandler = ()=>{
    fetch("http://"+window.location.hostname+":8080/api/newscards/id/"+this.state.newscard._id+"/action/view",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.state.session.email.toLowerCase(),
        "token": this.state.session.token,
      })
    })
    .then((response) => {
      console.log(response)
    })
  }
  likeHandler = () => {
    //alert("Comment: "+comment+" From: "+this.state.session._id)
    fetch("http://"+window.location.hostname+":8080/api/newscards/id/"+this.state.newscard._id+"/action/like",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.state.session.email.toLowerCase(),
        "token": this.state.session.token,
      })
    })
    .then((response) => {
      return (response.json())
    }).then(ActionList => {
      //console.log(ActionList)
      this.state.newscard.actions = ActionList;
      this.forceUpdate();
      textArea.value=""
    })
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
              <p>La Agencia Central de Inteligencia (CIA, por sus siglas en inglés), planeaba una “operación de desestabilización” al gobierno de Luis Echeverría en 1975.</p>
            </div>
            <div className="CPHFooter">
              <div className="FooterLeft Actions">
                <button className="actionBtn" onClick={this.likeHandler}>
                  <FontAwesomeIcon icon="thumbs-up" /> 
                  <span> {this.state.collection.actions.likes.length}</span>
                </button>
                <button className="actionBtn">
                  <FontAwesomeIcon icon="star"/> 
                  <span> 0</span>
                </button>
                <button className="actionBtn">
                  <FontAwesomeIcon icon="share-alt"/> 
                  <span> 0</span>
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


