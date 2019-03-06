/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import FeedPage from 'containers/FeedPage/Loadable';
import SignupPage from 'containers/SignupPage/Loadable';
import BusquedaPage from 'containers/BusquedaPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import './style.scss';
import NewsCardViewer from 'components/NewsCardView/NewsCardViewer';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="%s - Quixy | Plataforma de noticias inteligente"
      defaultTitle="Quixy | Plataforma de noticias inteligente"
    >
      <meta name="description" content="Plataforma de noticias inteligente (IA, PNL, RS)" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/sesion" exact component={SignupPage} />
      <Route path="/busqueda" component={BusquedaPage} />
      <Route path="/feed" component={FeedPage} />

      <Route path="/NewsCard/:new" component={NewsCardViewer} />


      <Route path="" component={NotFoundPage} />
    </Switch>
    
  </div>
);

export default App;
