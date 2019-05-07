/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';

import Collection from 'components/Collection';
import BreakingNew from 'components/BreakingNew';

import NewsCardFeed from 'containers/NewsCardFeed/Loadable';
import NewsCardPage from 'containers/NewsCardPage/Loadable';
import CollectionPage from 'containers/CollectionPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import PrincipalFooter from 'components/PrincipalFooter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {apiRestHost,apiRestHostDev} from '../../server.json';
import http from 'http';

import './style.scss';

export default class Principal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor({match}){
    super();
    this.state = {
      session: {},
      busqueda: "", 
      resultados: [], 
      searchAwait: false,
      pageCount: 0,
      tab: match.params.slug,
      collections: [],
      collectionsRec: [],
    };
    
    //console.log("p: ",this.state.tab)
  }
  shouldComponentUpdate() {return true}

  componentWillMount() {
    //GET COLLECTIONS 
    //console.log("http://"+window.location.hostname+':8080/api/collections/get/6/0');
    fetch("http://"+window.location.hostname+':8080/api/collections/get/6/0')
      .then((response) => {
        return response.json()
      }).then((collections) => {
        //console.log(JSON.stringify(newscards[0]));
        this.setState({ collections: collections, collectionsRec: collections })
      })

    return true;
  };

  componentDidMount(){
    if(this.state.tab == 'tab1' || this.state.tab == 'tab2') //console.log("go to "+this.state.tab)
      document.querySelector("#"+this.state.tab).click();
    ReactDOM.findDOMNode(this.refs.pagearea)
      .addEventListener('scroll', this.getMoreEntriesNC);
  }

  componentWillUnmount(){
    ReactDOM.findDOMNode(this.refs.pagearea)
      .removeEventListener('scroll', this.getMoreEntriesNC);
  }

  // Solo funciona si existe #carg en la pagina
  getMoreEntriesNC = () => {
    var getMoreNC = document.querySelector("#getMoreNC.available");
    
    if(getMoreNC == undefined) return;

    var pageCount = this.state;
    var rect = getMoreNC.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);

    
    if(isVisible){
      var pageCountNext = this.state.pageCount + 1;
      this.setState({pageCount: pageCountNext})
      //console.log("visible", this.state.pageCount)
    }
  }

  render() { 
    return (
      <div className="Principal tab1">
        <aside className="FeaturedAside">
          <div className="BreakingNewsSlider">
            <BreakingNew key={1} params={{
              image:require("images/bnews/b1.jpg"), 
              name:"Lorem Ipsum Dat ed Ipsum",
              slug:"eu-rebaja-tension-con-mexico-por-tema-migratorio",
              //degree:["#649ce6","#91e591","#9be591"]
            }} />
          </div>
          <div className="CollectionsContainer">
            <h3 className="RecomendationTitle">Recomendo para ti</h3>
            {this.state.collectionsRec.map((COL, i)=>(
                <Collection key={"CollectionRecommend-"+COL.slug} params={COL} />
            ))}
            <h3 className="RecomendationTitle">Recien llegados</h3>
            {this.state.collections.map((COL, i)=>(
                <Collection key={"CollectionNew-"+COL.slug} params={COL} />
            ))}
          </div>
        </aside>
        <section className="PageArea" ref="pagearea">
        <Switch>
          <Route exact path="/feed/:slug?" >
            <NewsCardFeed params={{pageCount: this.state.pageCount}}/>
          </Route>
          <Route exact path="/newscard/:slug" component={NewsCardPage} />
          <Route exact path="/collection/:slug" component={CollectionPage } />
          <Route exact path="" component={NotFoundPage} />
        </Switch>
        </section>

        <PrincipalFooter/>
      </div>
    );
  }
}


