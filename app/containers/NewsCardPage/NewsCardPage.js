import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Link} from "react-router-dom";
import NewsCardMini from 'components/NewsCardMini';

import {
  FacebookShareButton,LinkedinShareButton,TwitterShareButton,PinterestShareButton,TelegramShareButton,WhatsappShareButton,RedditShareButton,EmailShareButton,TumblrShareButton,
  FacebookIcon,TwitterIcon,LinkedinIcon,PinterestIcon,TelegramIcon,WhatsappIcon,RedditIcon,TumblrIcon,EmailIcon,
} from 'react-share';

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
      session: {active: false, admin: false, ...JSON.parse(sessionStorage.getItem("session"))},
      newscard: {
        filters:{
          humor: 0,
          viral: 0,
          title: 0,
          count_al: 0
        },
        _id: "",
        title: "",
        gallery: [], 
        newspaper: {
          thumbnail: "",
        },
        actions: {
          comments: [],
          likes: [],
          shares: [],
          favorites: [],
        },
        relacionados: [],
        
      },
      
    };
    console.log(this.state.newscard)
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
        if(newscard_r == 'fail'){
          //BrowserRouter.push("/404");
          console.log("fail");
          return;
        }
        this.setState({newscard: newscard_r, slugChange:false}, ()=>{
          console.log(this.state.newscard)
        })
        
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
  formatQuoteDate = (date) => {
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f=new Date(date);
    return f.getFullYear()+", "+meses[f.getMonth()]+" "+f.getDate();
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
    //alert("Comment: "+comment+" From: "+this.state.session._id)
    fetch("http://"+window.location.hostname+":8080/api/newscards/id/"+this.state.newscard._id+"/action/like",{
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
      return (response.json())
    }).then(ActionList => {
      //console.log(ActionList)
      this.state.newscard.actions = ActionList;
      this.forceUpdate();
      textArea.value=""
    })
  }
  favoriteHandler = () => {
    fetch("http://"+window.location.hostname+":8080/api/newscards/id/"+this.state.newscard._id+"/action/favorite",{
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
      return response.json()
    }).then(ActionList => {
      //console.log(ActionList)
      this.state.newscard.actions = ActionList;
      this.forceUpdate();
      textArea.value=""
    })
  }
  shareHandler = () => {
    var SocialShareContainer = document.querySelector("#SocialShareContainer")
    if(SocialShareContainer.className == "active") SocialShareContainer.className = "";
    else SocialShareContainer.className = "active"
  }
  shareFinishedHandler = () => {
    fetch("http://"+window.location.hostname+":8080/api/newscards/id/"+this.state.newscard._id+"/action/share",{
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
      return response.json()
    }).then(ActionList => {
      //console.log(ActionList)
      this.state.newscard.actions = ActionList;
      this.forceUpdate();
      textArea.value=""
    })
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
        //console.log(ActionList)
        this.state.newscard.actions = ActionList;
        this.forceUpdate();
        textArea.value=""
      })
    }
    
  }
  quoteHandler = () => {
    var QuoteContainer = document.querySelector("#QuoteContainer")
    if(QuoteContainer.className == "active") QuoteContainer.className = "";
    else QuoteContainer.className = "active"
  }
  deleteHandler = () => {
    if(confirm("Seguro desea eliminar la colección "+this.state.newscard.title+"?"))
    fetch("http://"+window.location.hostname+":8080/api/newscards/id/"+this.state.newscard._id,{
      method: 'Delete',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      return response.json()
    }).then(res => {
      if(res.deleted == "deleted"){
        alert("esta noticia se ha eliminado");
        window.history.back();
      }
    })
  }
  checkFilters = (params) => {
    var total = params.filters.humor + params.filters.viral + params.filters.title;
    if(params.filters.humor > 0) return {color:'green'};
    else if(params.filters.viral > 0) return {color:'orange'};
    else if(total > 0 || params.filters.count_al > 1){
      return {color:'red'};
    }
    return {color:'black'};
  }
  render() {

    
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
              <img src={this.state.newscard.newspaper.thumbnail} style={{height: '30px'}} />
              <span className="DateNew">{this.formatDate(this.state.newscard.published)}</span>
            </div>
            
            <article className="NewsCard">
            
              <div className="NewsCardBody">
                
                <div className="NewsCardContent">
                            
                  <span className="NewsCardTitle" style={this.checkFilters(this.state.newscard)}>
                    {this.state.newscard.title/*+": "+ this.state.newscard._id*/}
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
                  {this.state.session.active &&
                    <button className="actionBtn" onClick={this.likeHandler}>
                      <FontAwesomeIcon icon="thumbs-up"/> 
                      <span> {this.state.newscard.actions.likes.length}</span>
                    </button>
                  }
                  {this.state.session.active &&
                    <button className="actionBtn" onClick={this.favoriteHandler}>
                      <FontAwesomeIcon icon="star"/>
                      <span> {this.state.newscard.actions.favorites.length}</span>
                    </button>
                  }
                  
                    <button className="actionBtn" onClick={this.shareHandler}>
                      <FontAwesomeIcon icon="share-alt"/> 
                      <span> {this.state.newscard.actions.shares.length}</span>
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
            {this.state.session.admin && (
              <div id="AdminOptions" className="Actions" style={{background:'white', border: '1px solid #E2E2E2', padding:'.7rem', paddingTop: '.3rem', marginBottom: '.7rem'}}>
                <h4 style={{marginBottom:'.5rem'}}>Acciones de administrador</h4>
                <button className="actionBtn" onClick={this.deleteHandler}>
                  <span> Eliminar Noticia</span>
                </button>
                
              </div>
            )}

            <div id="SocialShareContainer">
              <div className="SocialShare">
                <FacebookShareButton
                  url={location.href}
                  quote={this.state.newscard.title.toUpperCase()+": "+this.state.newscard.summary}
                  onShareWindowClose={this.shareFinishedHandler}
                  className="SocialShare__share-button">
                  <FacebookIcon
                    size={32}
                    round />
                </FacebookShareButton>
              </div>

              <div className="SocialShare">
                <TwitterShareButton
                  url={location.href}
                  title={this.state.newscard.title.toUpperCase()+": "+this.state.newscard.summary}
                  onShareWindowClose={this.shareFinishedHandler}
                  className="SocialShare__share-button">
                  <TwitterIcon
                    size={32}
                    round />
                </TwitterShareButton>
              </div>

              <div className="SocialShare">
                <TelegramShareButton
                  url={location.href}
                  title={this.state.newscard.title.toUpperCase()+": "+this.state.newscard.summary}
                  onShareWindowClose={this.shareFinishedHandler}
                  className="SocialShare__share-button">
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>

              <div className="SocialShare">
                <WhatsappShareButton
                  url={location.href}
                  title={this.state.newscard.title.toUpperCase()+": "+this.state.newscard.summary}
                  onShareWindowClose={this.shareFinishedHandler}
                  separator=":: "
                  className="SocialShare__share-button">
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>

              <div className="SocialShare">
                <LinkedinShareButton
                  url={location.href}
                  title={this.state.newscard.title.toUpperCase()+": "+this.state.newscard.summary}
                  windowWidth={750}
                  windowHeight={600}
                  onShareWindowClose={this.shareFinishedHandler}
                  className="SocialShare__share-button">
                  <LinkedinIcon
                    size={32}
                    round />
                </LinkedinShareButton>                
              </div>

              <div className="SocialShare">
                <PinterestShareButton
                  url={String(window.location)}
                  media={this.state.newscard.newspaper.thumbnail}
                  windowWidth={1000}
                  windowHeight={730}
                  onShareWindowClose={this.shareFinishedHandler}
                  className="SocialShare__share-button">
                  <PinterestIcon size={32} round />
                </PinterestShareButton>
              </div>

              <div className="SocialShare">
                <RedditShareButton
                  url={location.href}
                  title={this.state.newscard.title.toUpperCase()+": "+this.state.newscard.summary}
                  windowWidth={660}
                  windowHeight={460}
                  onShareWindowClose={this.shareFinishedHandler}
                  className="SocialShare__share-button">
                  <RedditIcon
                    size={32}
                    round />
                </RedditShareButton>
              </div>

              <div className="SocialShare">
                <TumblrShareButton
                  url={location.href}
                  title={this.state.newscard.title.toUpperCase()+": "+this.state.newscard.summary}
                  windowWidth={660}
                  windowHeight={460}
                  onShareWindowClose={this.shareFinishedHandler}
                  className="SocialShare__share-button">
                  <TumblrIcon
                    size={32}
                    round />
                </TumblrShareButton>
              </div>

              <div className="SocialShare">
                <EmailShareButton
                  url={location.href}
                  subject={this.state.newscard.title.toUpperCase()+": "+this.state.newscard.summary}
                  onShareWindowClose={this.shareFinishedHandler}
                  body="body"
                  className="SocialShare__share-button">
                  <EmailIcon
                    size={32}
                    round />
                </EmailShareButton>
              </div>


            </div>
                        
            <div id="QuoteContainer">
              <h4>¡Agrega esta noticia a tus documentos!</h4><br/>
              [1] {(this.state.newscard.authors || []).join(", ")}, {this.state.newscard.newspaper.name}. ({this.formatQuoteDate(this.state.newscard.published)}). {this.state.newscard.title} (1nd ed.) [Online]. Available: {location.href}
            </div>

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
                
                {this.state.newscard.gallery.map((image, i)=> ( this.state.newscard.gallery.indexOf(image.split(',')[0]) != -1 ) && (
                  <a href={image.split(',')[0]} target="_window" key={'gallery-'+i}><img className="GalleryImage" src={image.split(',')[0]} onError={(e)=>{e.target.onerror = null; e.target.style="display:none;"}}/></a>
                ))}
              </div>
            </div>

            {/*this.state.newscard.actions.comments*/}
            <div className="Secundary">
              <div className="CommentBox">
                <h3>Comentarios ({this.state.newscard.actions.comments.length})</h3>

                {this.state.session.active &&
                  <div className="CommentInput">
                      <textarea className="CommentArea" placeholder="Escribe algo..."></textarea>
                      <br/>
                      <button className="CommentGo" style={{marginTop: '.7rem'}} onClick={({target}) => this.commentHandler(target)}>Comentar</button>
                  </div>
                }
                {this.state.newscard.actions.comments.map((comment, i)=> comment != null && comment.user != null && (
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
                {this.state.newscard.relacionados.map((NC, i)=>(
                  <NewsCardMini key={"NewsCardMini-"+NC._id} params={NC}/>
                ))}
                
              </div>
            </div>
          
          
        </div>
      </div>
    )
  }
}
