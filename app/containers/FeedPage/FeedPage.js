/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import NewsCard from 'components/NewsCard';
import './style.scss';

export default class FeedPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(){
    super();
    this.state = {
      resultados: [
        {title: "hols", content: "content1"},
        {title: "hola", content: "content2"},
      ],
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
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <h1>Feed</h1>
        <div id="FeedContainer">
          <section>
            {this.state.resultados.map( (resultado, i) => 
              <NewsCard key={i} title={resultado.title} content={resultado.content}/>
            )}
          </section>
          <aside></aside>
        </div>
         
      </div>
    );
  }
}
