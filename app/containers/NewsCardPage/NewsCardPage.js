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
      searchAwait: false,
      newscard: {},
    };
  }

  componentWillMount() {
    fetch("http://localhost:8080/api/newscards/slug/"+this.state.slug)
      .then((response) => {
        return response.json()
      }).then((newscard_r) => {
        console.log(newscard_r)
        this.setState({newscard: newscard_r})
      })
  }
  completeNew = (event) => {
    let likeButton = event.target;
    let completeNew = document.querySelector(".CompleteNewContent");
    if( likeButton.innerText == 'Ver nota completa' ){
      likeButton.innerText = 'Esconder nota completa';
      completeNew.style = "display:block;"
    } else {
      likeButton.innerText = 'Ver nota completa';
      completeNew.style = "display:none;"
    }
  }
  formatDate = (date) => {
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    var f=new Date(date);
    return diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
  }
  render() {
    return (
      <div className="ModalViewerContainer">
          <div className="ModalViewer">
              <div className="NewsCardContainer">
                <div className="Thumbnail left-side">
                  <img src={this.state.newscard.thumbnail} onError={(e)=>{e.target.onerror = null; e.target.src="http://www.bandt.com.au/information/uploads/2015/03/iStock_000042108274_Small-1260x840.jpg"}}/>
                </div>
                <div className="SummaryContainer">
                  <h3 className="Title">
                    <small>
                      <span>
                        Autor(es): {
                          this.state.newscard.authors != undefined 
                          && this.state.newscard.authors.join(", ")
                        }
                      </span>
                      <span>
                        {this.formatDate(this.state.newscard.published)}
                      </span>
                    </small>
                    <div className="NewTitle">
                      {this.state.newscard.title}
                    </div>
                    
                  </h3>
                  <p className="Summary">{this.state.newscard.summary}</p>
                  
                  <div className="Actions">
                    <button className="CompleteNew" onClick={this.completeNew} >
                      Ver nota completa
                    </button>
                    <div className="Interactive">
                      <button className="Like">
                        <FontAwesomeIcon icon="thumbs-up" style={{cursor:"pointer"}}/>
                      </button>
                      <button className="Favorite">
                        <FontAwesomeIcon icon="star" style={{cursor:"pointer"}}/>
                      </button>
                      <button className="Share">
                        <FontAwesomeIcon icon="share-alt" style={{cursor:"pointer"}}/>
                      </button>
                      <button className="Quote">
                        <FontAwesomeIcon icon="quote-right" style={{cursor:"pointer"}}/>
                      </button>
                      <button className="Original" onClick={() => window.open(this.state.newscard.url,this.state.newscard.title)}>
                        <FontAwesomeIcon icon="link" style={{cursor:"pointer"}}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="CompleteNewContent">
                {this.state.newscard.body}
                <div style={{textAlign:"right"}}>
                  <br/>
                  <button className="VerOriginal" onClick={() => window.open(this.state.newscard.url,this.state.newscard.title)} >
                    Ver nota original
                  </button>
                  &nbsp;&nbsp;
                  <button className="CompleteNew2" onClick={() => document.querySelector(".CompleteNew").click()} >
                    Esconder nota completa
                  </button>
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


              <h1></h1>
            
          </div>
      </div>
    )
  }
}
