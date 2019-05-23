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
      session: {active: false, admin: false, _id: false, ...JSON.parse(sessionStorage.getItem("session"))},
      busqueda: "", 
      resultados: [], 
      searchAwait: false,
      pageCount: 0,
      tab: match.params.slug,
      collections: [],
      collectionsRec: [],
      breakingnew: [],
      breakingnewElem: {},
      breakingnewCount: 0,
    };
    
    //console.log("p: ",this.state.tab)
  }

  slider = (direction) => {
    var breakingnewCount = this.state.breakingnewCount + direction; 
    if( breakingnewCount < 0) breakingnewCount = this.state.breakingnew.length - 1;
    else if( breakingnewCount >= this.state.breakingnew.length) breakingnewCount = 0;

    this.setState({breakingnewCount});

    console.log(breakingnewCount);
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
        this.setState({ collections: collections})
      })

    fetch("http://"+window.location.hostname+':8080/api/breakingnews/popular')
      .then((response) => {
        return response.json()
      }).then((breakingnew) => {
        console.log("bn",breakingnew);
        this.setState({ breakingnew })
      })

    return true;
  };

  componentDidMount(){
    if(this.state.tab == 'tab1' || this.state.tab == 'tab2') //console.log("go to "+this.state.tab)
      document.querySelector("#"+this.state.tab).click();
    ReactDOM.findDOMNode(this.refs.pagearea)
      .addEventListener('scroll', this.getMoreEntriesNC);

    if(this.state.session.active && this.state.session.history.length > 200)
    fetch("http://"+window.location.hostname+':8080/api/users/recommend/'+this.state.session._id)
      .then((response) => {
        return response.json()
      }).then((collections) => {
        //console.log(JSON.stringify(newscards[0]));
        this.setState({ collectionsRec: collections })
      })
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
          <div className="BreakingNewsSlider" style={{position:"relative"}}>
            
            {this.state.breakingnew.length > 0 && 
              <BreakingNew 
                key={"breakingnew"-1} 
                params={{...this.state.breakingnew[this.state.breakingnewCount] , count:this.state.breakingnewCount}} 
              />
            }
            <div 
              style={{position:"absolute", top:"calc(50% - 45px)", left:0, padding: ".5rem 1.1rem", background:"rgba(0,0,0,.7)", color:"white", fontWeight:700}} 
              onClick={() => this.slider(-1)}
            >&lt;</div>
            <div 
              style={{position:"absolute", top:"calc(50% - 45px)", right:0, padding: ".5rem 1.1rem", background:"rgba(0,0,0,.7)", color:"white", fontWeight:700}} 
              onClick={() => this.slider(1)}
            >></div>

          </div>
          <div className="CollectionsContainer">
            {this.state.session.active && this.state.session.history.length > 200 && <h3 className="RecomendationTitle">Recomendo para ti <small><Link className="ViewAll" to="/collectionfeed">Ver todas</Link></small></h3>}
            {this.state.collectionsRec.map((COL, i)=>(
                <Collection key={"CollectionRecommend-"+COL.slug} params={COL} />
            ))}
            <h3 className="RecomendationTitle">Recien llegados <small><Link className="ViewAll" to="/collectionfeed">Ver todas</Link></small></h3>
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


