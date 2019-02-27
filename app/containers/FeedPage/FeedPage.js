/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import NewsCard from 'components/NewsCard';
import './style.scss';
import {noticias} from '../../dataold.json';

export default class FeedPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // load in JSON data from file

  constructor(){
    super();
    console.log(noticias[0].noticia[0].title);
    this.state = {
      resultados: noticias,
    };
  }
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="feature-page">
        <Helmet>
          <title>Feed Page</title>
          <meta
            name="description"
            content="Quixy | Plataforma de noticias inteligente"
          />
        </Helmet>
        <h1>Feed</h1>
        <div id="FeedContainer">
          <section>
            {this.state.resultados.map( (resultado, i) => 
              
              <NewsCard key={i} params={resultado.noticia[0]}/>
            )}
          </section>
          <aside></aside>
        </div>
         
      </div>
    );
  }
}
