/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';

import Collection from 'components/Collection';
import BreakingNew from 'components/BreakingNew';

import NewsCardFeed from 'containers/NewsCardFeed/Loadable';
import NewsCardPage from 'containers/NewsCardPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

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
    return true;
  };

  render() { 
    return (
      <div className="Principal" >
        <aside className="FeaturedAside">
          <div className="BreakingNewsSlider">
            <BreakingNew key={1} params={{
              image:require("images/bnews/b1.jpg"), 
              title:"Lorem Ipsum Dat ed Ipsum",
              //degree:["#649ce6","#91e591","#9be591"]
            }} />
          </div>
          <div className="CollectionsContainer">
            <h3 className="RecomendationTitle">Recomendo para ti</h3>
            <Collection key={1} params={{
              title:"Narco en México",
              image:"https://cdn2.excelsior.com.mx/media/storage/elchapo_0.jpg",
              description:"Lorem Ipsum Dat ed Ipsum"
            }} />
            <Collection key={2} params={{
              title:"El congreso del estado de México",
              image:"http://seguidoresdeverdad.com/seguidoresdeverdad/html/blog/wp-content/uploads/2017/01/politicos-770x300.jpg",
            }} />
            <Collection key={3} params={{
              title:"lorem",
              image:"https://img.gestion.pe/files/ec_article_multimedia_gallery/uploads/2017/11/08/5a03559158092.jpeg",
            }} />
            <Collection key={4} params={{
              title:"lorem",
              image:"https://pbs.twimg.com/profile_images/1040750620871815168/rWbZvyrs_400x400.jpg",
            }} />

            <h3 className="RecomendationTitle">Recien llegado</h3>
            <Collection key={5} params={{
              title:"AMLO en presidencia",
              image:require("images/bnews/b1.jpg"),
              description:"Lorem Ipsum Dat ed Ipsum"
            }} />
            <Collection key={6} params={{
              title:"El congreso del estado Mex",
              image:"http://seguidoresdeverdad.com/seguidoresdeverdad/html/blog/wp-content/uploads/2017/01/politicos-770x300.jpg",
            }} />
            <Collection key={7} params={{
              title:"lorem",
              image:"https://img.gestion.pe/files/ec_article_multimedia_gallery/uploads/2017/11/08/5a03559158092.jpeg",
            }} />
            <Collection key={8} params={{
              title:"lorem",
              image:"https://pbs.twimg.com/profile_images/1040750620871815168/rWbZvyrs_400x400.jpg",
            }} />
          </div>
        </aside>
        <section className="PageArea">
        <Switch>
          <Route exact path="/feed/" component={NewsCardFeed} />
          <Route path="/feed/:slug" component={NewsCardPage}/>
          <Route path="" component={NotFoundPage} />
        </Switch>
        </section>

      </div>
    );
  }
}


