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
import Collection from 'components/Collection';
import BreakingNew from 'components/BreakingNew';
import qwest from 'qwest';
//import {noticias} from '../../dataold.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import http from 'http';


//var request = client.request('PUT', '/users/1');


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
    fetch('http://localhost:8080/api/newscards/')
      .then((response) => {
        return response.json()
      }).then((newscards) => {
        //console.log(newscards);
        this.setState({ resultados: newscards })
      })
    /*var client = http.createClient(8080, 'localhost');
    return client.request('PUT', '/api/newscards/');*/
  };

  render() { 
    return (
      <div className="feature-page" data-offcanvas="true" >
        <aside className="NewsCardsContainer">
          <Helmet>
            <title>Inicio</title>
            <meta
              name="description"
              content="Quixy | Plataforma de noticias inteligente"
            />
          </Helmet>
          {this.state.resultados.map( (resultado, i) => <NewsCard key={i} params={resultado}/> )}
        </aside>
        <section className="PrincipalContent">
          <div className="BreakingNewsSlider">
            <BreakingNew key={1} params={{
              image:require("images/bnews/b1.jpg"), 
              title:"Lorem Ipsum Dat ed Ipsum",
              degree:["#9198e5","#e66465","#9be591"]
            }} />
          </div>
          <div className="CollectionsContainer">
            <h3 className="RecomendationTitle">Popular</h3>
            <Collection key={1} params={{
              title:"AMLO en presidencia",
              image:require("images/bnews/b1.jpg"),
              description:"Lorem Ipsum Dat ed Ipsum"
            }} />
            <Collection key={2} params={{
              title:"El congreso del estado Mex",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={3} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={4} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={5} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={6} params={{
              title:"AMLO en presidencia",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={7} params={{
              title:"El congreso del estado Mex",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={8} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={9} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={10} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />

            <h3 className="RecomendationTitle">Recomendacion</h3>
            <Collection key={11} params={{
              title:"AMLO en presidencia",
              image:require("images/bnews/b1.jpg"),
              description:"Lorem Ipsum Dat ed Ipsum"
            }} />
            <Collection key={12} params={{
              title:"El congreso del estado Mex",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={13} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={14} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={15} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={16} params={{
              title:"AMLO en presidencia",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={17} params={{
              title:"El congreso del estado Mex",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={18} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={19} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />
            <Collection key={20} params={{
              title:"lorem",
              image:require("images/bnews/b1.jpg"),
            }} />
          </div>
        </section>
      </div>
    );
  }
}


