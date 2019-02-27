/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import NewsCard from 'components/NewsCard';
import BreakingNew from 'components/BreakingNew';
//import {noticias} from '../../dataold.json';
import {newspapers} from '../../data.json';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(){
    super();
    this.state = {
      busqueda: "",
      resultados: this.getNews(), 
      searchAwait: false,
    };
  }

  getNews = () => [...newspapers[0].data.noticias];
  
  render() { 
    return (
      <div className="feature-page">
        <aside className="NewsCardsContainer">
          <Helmet>
            <title>Inicio</title>
            <meta
              name="description"
              content="Quixy | Plataforma de noticias inteligente"
            />
          </Helmet>
          {this.state.resultados.map( (resultado, i) => 
              <NewsCard key={i} params={resultado}/> 
          )}
        </aside>
        <section className="PrincipalContent">
          <div className="BreakingNewsSlider">
            <BreakingNew key={1} params={{
              image:require("images/bnews/b1.jpg"), 
              title:"Lorem Ipsum Dat ed Ipsum",
              degree:["#9198e5","#e66465","#9be591"]
            }} />
          </div>
        </section>
      </div>
    );
  }
}


