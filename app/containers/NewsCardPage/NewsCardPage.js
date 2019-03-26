import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import NewsCard from 'components/NewsCard';
import Collection from 'components/Collection';
import BreakingNew from 'components/BreakingNew';
import qwest from 'qwest';
//import {noticias} from '../../dataold.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import http from 'http';

import './style.scss';

export default class NewsCardPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor({match}){
    super();
    this.state = {
      slug: match.params.slug,
      session: JSON.parse(sessionStorage.getItem("session")),
      busqueda: "",
      resultados: [], 
      searchAwait: false,
      newscard: null,
    };
  }
  componentWillMount() {
    fetch('http://localhost:8080/api/newscards/slug/'+this.state.slug)
      .then((response) => {
        return response.json()
      }).then((newscard_r) => {
        console.log(newscard_r);
        this.setState({ newscard: newscard_r })
      })
  }
  render() {
    return (
      <div className="ModalViewerContainer" style={{height:"5000px"}}>
          <div className="ModalViewer">
              <div className="NewsCardContainer">
                <div className="Thumbnail left-side"></div>
                <div className="Summary">
                  <h3 className="Title"></h3>
                  <p className="SummaryContent"></p>
                  <div className="CompleteNew">
                    Ver la nota completa
                  </div>
                  <div className="Actions"></div>
                </div>
              </div>
              
              <div className="GallerySlide COMPONENT">
                <div className="Image"></div>
              </div>

              <div className="CommentBox COMPONENT">
                <div className="Comment">
                  <div className="ProfileImage"></div>
                  <div className="CommentContent">
                    <div className="UserName"></div>
                    <p className="CommentText"></p>
                    <div className="Actions"></div>
                  </div>
                </div>
              </div>

              <div className="RelatedCollections">
                COMPONENT LIST
              </div>

              <div className="RelatedNewsCards">
                COMPONENT LIST
              </div>


              <h1>{JSON.stringify(this.state.newscard)}</h1>
            
          </div>
      </div>
    )
  }
}
