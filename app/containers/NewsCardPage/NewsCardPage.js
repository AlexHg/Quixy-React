import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Link} from "react-router-dom";
import NewsCardMini from 'components/NewsCardMini';

import qwest from 'qwest';

//import {noticias} from '../../dataold.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {apiRestHost,apiRestHostDev} from '../../server.json';
import http from 'http';

import './style.scss';

export default class NewsCardPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor({match}){
    super();
    this.state = {
      slug: match.params.slug,
      slugChange: false,
      session: {active: false, ...JSON.parse(sessionStorage.getItem("session"))},
      newscard: {
        gallery: [], 
        newspaper: {
          thumbnail: "",
        },
        actions: {
          comments: [],
        },
      },
      
    };
  }
  componentWillMount() {
    this.mountData();
    return "cargando...";
    
  }
  componentDidMount(){
    //this.setState({session: JSON.parse(sessionStorage.getItem("session")),})
    setTimeout(
      ()=> document.querySelector('.ModalViewerContainer').className = "ModalViewerContainer mounted",
      200
    )
    document.querySelector(".PageArea").scrollTop = 0;
    document.querySelector(".PrincipalFooter #tab2").click();
  }
  componentDidUpdate(){
    if(this.state.slugChange){
      setTimeout(
        ()=>{
          document.querySelector('.ModalViewerContainer').className = "ModalViewerContainer mounted"
          this.mountData();
          
        },
        200
      )
      document.querySelector(".PageArea").scrollTop = 0;
    }
    document.querySelector(".PrincipalFooter #tab2").click();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.slug != this.state.slug){
      document.querySelector('.ModalViewerContainer').className = "ModalViewerContainer unmounted"
      setTimeout(
        () => this.setState({slug: nextProps.match.params.slug, slugChange: true})
        ,200
      )
      
      
    }
  }
  mountData = () =>{
    fetch("http://"+window.location.hostname+":8080/api/newscards/slug/"+this.state.slug)
      .then((response) => {
        return response.json()
      }).then((newscard_r) => {
        this.setState({newscard: newscard_r, slugChange:false})
        //console.log(this.state.newscard)
        if(this.state.session.active) this.viewHandler();
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
    //console.log(direction)

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
  viewHandler = ()=>{
    fetch("http://"+window.location.hostname+":8080/api/newscards/id/"+this.state.newscard._id+"/action/view",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.state.session.email.toLowerCase(),
        "token": this.state.session.token,
      })
    })
    .then((response) => {
      console.log(response)
    })
  }
  likeHandler = () => {
    alert("Action: Like, From: "+this.state.session._id)
  }
  favoriteHandler = () => {
    alert("Action: Favorite, From: "+this.state.session._id)
  }
  shareHandler = () => {
    alert("Action: Share")
  }
  commentHandler = (target) => {    
    var textArea = target.parentNode.querySelector(".CommentArea")
    var comment = textArea.value;
    if(comment.length > 0){
      //alert("Comment: "+comment+" From: "+this.state.session._id)
      fetch("http://"+window.location.hostname+":8080/api/newscards/id/"+this.state.newscard._id+"/action/comment",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "comment": comment,
          "email": this.state.session.email.toLowerCase(),
          "token": this.state.session.token,
        })
      })
      .then((response) => {
        return (response.json())
      })
      .then(ActionList => {
        console.log(ActionList)
        this.state.newscard.actions = ActionList;
        this.forceUpdate();
        textArea.value=""
      })
    }
    
  }
  quoteHandler = () => {
    alert("Action: Quote")
  }
  
  render() {

    var relacionados = [
      {
        _id: '5ca3a73a480f651c60aad126',
        title: 'Suspenden comparecencia de subsecretaria de Bienestar',
        slug: 'suspenden-comparecencia-de-subsecretaria-de-bienestar',
        thumbnail: 'https://www.milenio.com/uploads/media/2019/03/12/funcionaria-trasladada-silla-ruedas-servicio_87_0_545_339.JPG',
        newspaper: '5ca39621480f651c60aad05a'
      },
      {
        _id: '5ca3a73a480f651c60aad126',
        title: 'Suspenden comparecencia de subsecretaria de Bienestar',
        slug: 'suspenden-comparecencia-de-subsecretaria-de-bienestar',
        thumbnail: 'https://www.milenio.com/uploads/media/2019/03/12/funcionaria-trasladada-silla-ruedas-servicio_87_0_545_339.JPG',
        newspaper: '5ca39621480f651c60aad05a'
      },
      {
        _id: '5ca3a73a480f651c60aad126',
        title: 'Suspenden comparecencia de subsecretaria de Bienestar',
        slug: 'suspenden-comparecencia-de-subsecretaria-de-bienestar',
        thumbnail: 'https://www.milenio.com/uploads/media/2019/03/12/funcionaria-trasladada-silla-ruedas-servicio_87_0_545_339.JPG',
        newspaper: '5ca39621480f651c60aad05a'
      },
      {
        _id: '5ca3a73a480f651c60aad126',
        title: 'Suspenden comparecencia de subsecretaria de Bienestar',
        slug: 'suspenden-comparecencia-de-subsecretaria-de-bienestar',
        thumbnail: 'https://www.milenio.com/uploads/media/2019/03/12/funcionaria-trasladada-silla-ruedas-servicio_87_0_545_339.JPG',
        newspaper: '5ca39621480f651c60aad05a'
      },
      {
        _id: '5ca3a73a480f651c60aad126',
        title: 'Suspenden comparecencia de subsecretaria de Bienestar',
        slug: 'suspenden-comparecencia-de-subsecretaria-de-bienestar',
        thumbnail: 'https://www.milenio.com/uploads/media/2019/03/12/funcionaria-trasladada-silla-ruedas-servicio_87_0_545_339.JPG',
        newspaper: '5ca39621480f651c60aad05a'
      }
    ]
    var comments = [

      { 
        user: {
          photo: "https://content-static.upwork.com/uploads/2014/10/02123010/profilephoto_goodcrop.jpg",
          name: 'Alejandro Hernandez', 
          email: 'alejandro@konecta.team',
        },
        date: Date.now(), 
        content: "Suspendisse potenti. Cras ut nulla aliquet, vestibulum felis et, scelerisque risus. Phasellus pulvinar, risus at sodales semper, quam lacus ullamcorper justo, et porta dui felis id velit. Nam vel elit dictum, consequat mauris ac, tincidunt nisl.",
      }
    ]
    return (
      <div className="ModalViewerContainer" name={window.location.href}>

        <Helmet>
          <title>{this.state.newscard.title}</title>
          <meta
            name="description"
            content="{this.state.newscard.title} - Quixy | Plataforma de noticias inteligente"
          />
        </Helmet>
          <div className="ModalViewer">
            <div className="MetaNew">
              <img src={this.state.newscard.newspaper.thumbnail} style={{height: '20px'}} />
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
                     {
                        this.state.newscard.authors != undefined 
                        && "Escrito por "+this.state.newscard.authors.join(", ")
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
                  {this.state.session != undefined &&
                    <button className="actionBtn" onClick={this.likeHandler}>
                      <FontAwesomeIcon icon="thumbs-up"/> 
                      <span> 0</span>
                    </button>
                  }
                  {this.state.session != undefined &&
                    <button className="actionBtn" onClick={this.favoriteHandler}>
                      <FontAwesomeIcon icon="star"/>
                      <span> 0</span>
                    </button>
                  }
                  
                    <button className="actionBtn" onClick={this.shareHandler}>
                      <FontAwesomeIcon icon="share-alt"/> 
                      <span> 0</span>
                    </button>
                    <button className="actionBtn" onClick={this.quoteHandler}>
                      <FontAwesomeIcon icon="quote-right"/>
                    </button>
                    <button className="actionBtn" onClick={() => window.open(this.state.newscard.url,this.state.newscard.title)}>
                      <FontAwesomeIcon icon="link" />
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
              <img className="Thumbnail" style={{maxWidth:'100%',width:'400px',float: 'right', margin: '2rem 15px 15px 2rem'}} src={this.state.newscard.thumbnail} onError={(e)=>{e.target.onerror = null; e.target.src=require('images/imagenno.png')}}/>
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
            
            <div className="controlcont" style={{marginTop: '1.7rem', marginBottom:'.7rem'}}>
              <button className="control" data-dir="left" onClick={this.scrollGallery}>&lt;</button>
              &nbsp;
              <button className="control" data-dir="right" onClick={this.scrollGallery}>></button>
            </div>

            {/*this.state.newscard.gallery*/}
            
            <div className="GallerySlide">
              <div className="SlideContainer">
                <a href={this.state.newscard.thumbnail} target="_window" key={'gallery-th'}><img className="GalleryImage" src={this.state.newscard.thumbnail} onError={(e)=>{e.target.onerror = null; e.target.style="display:none;"}}/></a>
                {this.state.newscard.gallery.map((image, i)=>(
                  <a href={image.split(',')[0]} target="_window" key={'gallery-'+i}><img className="GalleryImage" src={image.split(',')[0]} onError={(e)=>{e.target.onerror = null; e.target.style="display:none;"}}/></a>
                ))}
              </div>
            </div>

            {/*this.state.newscard.actions.comments*/}
            <div className="Secundary">
              <div className="CommentBox">
                <h3>Comentarios (50)</h3>

                {this.state.session != undefined &&
                  <div className="CommentInput">
                      <textarea className="CommentArea" placeholder="Escribe algo..."></textarea>
                      <br/>
                      <button className="CommentGo" style={{marginTop: '.7rem'}} onClick={({target}) => this.commentHandler(target)}>Comentar</button>
                  </div>
                }
                {this.state.newscard.actions.comments.map((comment, i)=>(
                  <div className="Comment" key={'comment-'+i}>
                    <div className="CommentHeader">
                      <div className="ProfileImage">
                        <Link to={"/user/"+comment.user.email}>
                          <img src={""+comment.user.photo} onError={(e)=>{e.target.onerror = null; e.target.src=require('images/imagenno.png')}}/>
                        </Link>
                      </div>
                    </div>
                    <div className="CommentText" >
                      <Link className="Username" to={"/user/"+comment.user.email}>{comment.user.name}</Link> 
                      {comment.content}
                    </div>
                    <span className="CommentDate">Publicado {this.formatDate(comment.created)}</span>
                  </div>
                ))}
              </div>

              <div className="RelatedContent">
                <h3>Relacionados</h3>
                {relacionados.map((NC, i)=>(
                  <NewsCardMini key={"NewsCardMini-"+i} params={NC}/>
                ))}
                
              </div>
            </div>
          
          
        </div>
      </div>
    )
  }
}
