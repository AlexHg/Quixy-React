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
import {apiRestHost,apiRestHostDev} from '../../server.json';
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
    fetch("http://"+window.location.hostname+":8080/api/newscards/slug/"+this.state.slug)
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
  scrollGallery = (event) => {
    let direction = event.target.dataset.dir;
    console.log(direction)

    let galleryBox = document.querySelector(".GallerySlide")
    let counter = 0
    let limit = 400;
    let aument = 10
    let scrolling = setInterval(()=>{
      counter += aument
      if(direction == 'right') galleryBox.scrollLeft += aument
      else galleryBox.scrollLeft -= aument
      if(counter >= limit) clearInterval(scrolling);
    }, 10);
    
  }
  render() {
    var gallery = [
      "https://ichef.bbci.co.uk/news/660/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg",
      "https://media1.tenor.com/images/5c406b927ec59a31eb67e3366f3121ef/tenor.gif?itemid=11909469",
      "https://www.newton.ac.uk/files/covers/968361.jpg",
      "https://globalgamejam.org/sites/default/files/styles/game_sidebar__normal/public/game/featured_image/promo_5.png?itok=9dymM8JD",
      "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
      "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      "https://images.unsplash.com/photo-1507723714871-f8d4b0d065b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
    ]

    var comments = [
      { 
        name: 'Alejandro Hernandez', 
        email: 'alejandro@konecta.team',
        date: Date.now(), 
        content: "Este es un comentario de prueba",
      },
      { 
        name: 'Alejandro Hernandez', 
        email: 'alejandro@konecta.team',
        date: Date.now(), 
        content: "Este es un comentario de prueba",
      },
      { 
        name: 'Alejandro Hernandez', 
        email: 'alejandro@konecta.team',
        date: Date.now(), 
        content: "Este es un comentario de prueba",
      }
    ]
    return (
      <div className="ModalViewerContainer">
        <Helmet>
          <title>{this.state.newscard.title}</title>
          <meta
            name="description"
            content="{this.state.newscard.title} - Quixy | Plataforma de noticias inteligente"
          />
        </Helmet>
          <div className="ModalViewer">
            <div className="MetaNew">
              <img src="http://mocaf.org.mx/wp-content/uploads/2018/03/La-Jornada.png" style={{height: '15px'}} />
              <span className="DateNew">{this.formatDate(this.state.newscard.published)}</span>
            </div>
            
            <article className="NewsCard">
            
              <div className="NewsCardBody">
                
                <div className="NewsCardContent">
                            
                  <span className="NewsCardTitle" >
                    {this.state.newscard.title}
                  </span>

                  <p className="Summary">{this.state.newscard.summary}</p>
                
                  <span className="NewsCardAuthors">
                    Escrito por {
                        this.state.newscard.authors != undefined 
                        && this.state.newscard.authors.join(", ")
                      }
                  </span>
                </div>
                <div className="clip">
                  <span>
                    <img className="Thumbnail" src={this.state.newscard.thumbnail} onError={(e)=>{e.target.onerror = null; e.target.src=require('images/imagenno.png')}}/>
                  </span>
                </div>

                
              </div>
              <div className="NewsCardFooter">
                <div className="FooterLeft Actions">
                  <button className="actionBtn">
                    <FontAwesomeIcon icon="thumbs-up"/> 0
                  </button>
                  <button className="actionBtn">
                    <FontAwesomeIcon icon="star"/> 0
                  </button>
                  <button className="actionBtn">
                    <FontAwesomeIcon icon="share-alt"/> 0
                  </button>
                  <button className="actionBtn">
                    <FontAwesomeIcon icon="quote-right"/>
                  </button>
                  <button className="actionBtn">
                    <FontAwesomeIcon icon="link"/>
                  </button>

                </div>
                <div className="FooterRight Actions">
                  <button className="actionBtn CompleteNew" onClick={this.completeNew}>Ver nota completa</button>
                </div>
              </div>

            </article>

            <div className="CompleteNewContent">

              <span className="NewsCardTitle" >
                {this.state.newscard.title}
              </span>
              <img className="Thumbnail" style={{width:'400px',float: 'right', margin: '2rem 15px 15px 2rem'}} src={this.state.newscard.thumbnail} onError={(e)=>{e.target.onerror = null; e.target.src=require('images/imagenno.png')}}/>
              <br/>{this.state.newscard.body}
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
            
            <div className="controlcont" style={{marginTop: '2rem'}}>
              <button className="control" data-dir="left" onClick={this.scrollGallery}>&lt;</button>
              &nbsp;
              <button className="control" data-dir="right" onClick={this.scrollGallery}>></button>
            </div>

            {/*this.state.newscard.gallery*/}
            <div className="GallerySlide">
              <div className="SlideContainer">
                {gallery.map((image, i)=>(
                  <a href={image} target="_window" key={i}><img className="GalleryImage" src={image}/></a>
                ))}
              </div>
            </div>

            {/*this.state.newscard.actions.comments*/}
            <div className="CommentBox">
              {this.state.session != undefined &&
                <div className="CommentInput">
                    <textarea placeholder="Escribe algo..."></textarea>
                    <br/>
                    <button className="CommentGo">Comentar</button>
                </div>
              }
              {comments.map((comment, i)=>(
                <div className="Comment" key={'comment'+i}>
                  <div className="CommentHeader">
                    <div className="ProfileImage">
                      <Link to={"/user/"+comment.email}>
                        <img src="https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg" onError={(e)=>{e.target.onerror = null; e.target.src=require('images/imagenno.png')}}/>
                      </Link>
                    </div>
                    <div className="CommentData">
                      <div className="UserName">
                        <Link to={"/user/"+comment.email}>{comment.name}</Link>
                      </div>
                      
                      
                    </div>
                  </div>
                  <div className="CommentText" >{comment.content}</div>
                  <span className="CommentDate">Publicado {this.formatDate(comment.date)}</span>
                </div>
              ))}
            </div>

            <div className="RelatedCollections">
              
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
