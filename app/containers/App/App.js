/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';

import SignupPage from 'containers/SignupPage/Loadable';
import BusquedaPage from 'containers/BusquedaPage/Loadable';

import Principal from 'containers/Principal/Loadable';

import NotFoundPage from 'containers/NotFoundPage/Loadable';

import Header from 'components/Header';
import Footer from 'components/Footer';
import './style.scss';
import NewsCardPage from 'containers/NewsCardPage/Loadable';

import {apiRestHost,apiRestHostDev} from '../../server.json';

class Logout extends React.Component {
  constructor(){
    super()
  }
  componentWillMount(){
    sessionStorage.removeItem("session")
  }
  render(){
    return <Redirect to='/session' />;
  }
}

const App = () => {
  (function(){
    fetch("http://"+window.location.hostname+':8080/api/auth/history/newscards')
      .then((response) => {
        return response.json()
      }).then((session) => {
        console.log(session)
        //if(session.type == "error") sessionStorage.removeItem("session")
      })
  })();
  return (
    <div className="app-wrapper">
      <Helmet
        titleTemplate="%s - Quixy | Plataforma de noticias inteligente"
        defaultTitle="Quixy | Plataforma de noticias inteligente"
      >
        <meta name="description" content="Plataforma de noticias inteligente (IA, PNL, RS)" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Redirect from="/" to="/feed" />} />
        <Route exact path="/feed/:page?" component={Principal} />


        
        
        <Route path="/busqueda" component={BusquedaPage} />
        
        <Route path="/session" exact component={SignupPage} />
        <Route path="/logout" exact component={Logout} />

        <Route path="" component={NotFoundPage} />
      </Switch>
      <Footer></Footer> 
    </div>
  )
};

export default App;
