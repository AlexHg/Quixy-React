/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Link} from "react-router-dom";
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';

import NewsCard from 'components/NewsCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {apiRestHost,apiRestHostDev} from '../../server.json';
import http from 'http';

import {
  FacebookShareButton,LinkedinShareButton,TwitterShareButton,PinterestShareButton,TelegramShareButton,WhatsappShareButton,RedditShareButton,EmailShareButton,TumblrShareButton,
  FacebookIcon,TwitterIcon,LinkedinIcon,PinterestIcon,TelegramIcon,WhatsappIcon,RedditIcon,TumblrIcon,EmailIcon,
} from 'react-share';

import './style.scss';

export default class CollectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor({match}){
    super();
    this.state = {
      session: {active: false, admin: false, ...JSON.parse(sessionStorage.getItem("session"))},
      slug: match.params.slug,
      slugChange: false,
      busqueda: "",
      searchAwait: false,
      collection: {
        _id: '',
        newsCards: [],
        name: "",
        keywords: [],
        actions: {
          likes: [],
          shares: [],
          favorites: [],
          subscriptions: [],
        }
      }
    };
    //console.log(JSON.parse(sessionStorage.getItem("session")))
    console.log(this.state)
  }
  shouldComponentUpdate() {return true}

  componentDidMount(){
    //console.log("sess", this.state.session.admin)
    setTimeout(
      ()=>{
        document.querySelector('.CollectionPage').className += " mounted"
        //document.querySelector(".PrincipalFooter #t2").click();
      },
      200
    )
    //ReactDOM.findDOMNode(this).scrollIntoView(false);
    document.querySelector(".PageArea").scrollTop = 0;
    document.querySelector(".PrincipalFooter #tab2").click();
  }
  componentDidUpdate(){

    if(this.state.slugChange){
      this.mountData();
      
    }
    document.querySelector(".PageArea").scrollTop = 0;
    document.querySelector(".PrincipalFooter #tab2").click();
  }
  componentWillMount() { 
    this.mountData();

    return "cargando...";
  };

  mountData(){
    /*fetch("http://"+window.location.hostname+':8080/api/newscards/get/10/1')
      .then((response) => {
        return response.json()
      }).then((newscards) => {
        //console.log(JSON.stringify(newscards[0]));
        this.setState({ resultados: newscards, slugChange:false})
        //if(this.state.session.active) this.viewHandler();
      })*/
     // console.log("http://"+window.location.hostname+':8080/api/collections/slug/'+this.state.slug)
    fetch("http://"+window.location.hostname+':8080/api/collections/slug/'+this.state.slug)
    .then((response) => {
      return response.json()
    }).then((collection) => {
      if(collection == 'fail'){
        //BrowserRouter.push("/404");
        console.log("fail");
        return;
      }
      //console.log(collection);
      this.setState({ collection: collection, slugChange:false},() => console.log("si",this.state))
      if(this.state.session.active) this.viewHandler();
      
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.slug != this.state.slug){
      this.setState({slug: nextProps.match.params.slug, slugChange: true})
    }
  }

  listenLinks(){
    var parent = document.querySelector('.CollectionPage');
    parent.addEventListener('click', function (event) {
        //console.log(event.target.tagName)
        if (event.target.tagName == 'A') {
            //console.log(event.target.closest(".NewsCard"));
            elementClicked = event.target.closest(".NewsCard");
            
            //parent.removeChild(event.target);
        }
    }, false);
  }

  viewHandler = ()=>{
    fetch("http://"+window.location.hostname+":8080/api/collections/id/"+this.state.collection._id+"/action/view",{
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
    //console.log(this.state.session)
    fetch("http://"+window.location.hostname+":8080/api/collections/id/"+this.state.collection._id+"/action/like",{
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
      this.state.collection.actions = ActionList;
      this.forceUpdate();
      //textArea.value=""
    })
  }
  favoriteHandler = () => {
    fetch("http://"+window.location.hostname+":8080/api/collections/id/"+this.state.collection._id+"/action/favorite",{
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
      this.state.collection.actions = ActionList;
      this.forceUpdate();
      //textArea.value=""
    })
  }
  shareHandler = () => {
    var SocialShareContainer = document.querySelector("#SocialShareContainer")
    if(SocialShareContainer.className == "active") SocialShareContainer.className = "";
    else SocialShareContainer.className = "active"
  }
  shareFinishedHandler = () => {
    fetch("http://"+window.location.hostname+":8080/api/collections/id/"+this.state.collection._id+"/action/share",{
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
      this.state.collection.actions = ActionList;
      this.forceUpdate();
      //textArea.value=""
    })
  }
  deleteHandler = () => {
    if(confirm("Seguro desea eliminar la colección "+this.state.collection.name+"?"))
    fetch("http://"+window.location.hostname+":8080/api/collections/id/"+this.state.collection._id,{
      method: 'PUT',
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

  render() { 
    return (
      <div className="CollectionPage" data-offcanvas="true" >
        <Helmet> 
          <title>Nuevas sobre {this.state.collection.name}</title>
          <meta
            name="description"
            content={"Nuevas sobre "+this.state.collection.name+" - Quixy | Plataforma de noticias inteligente"}
          />
        </Helmet>
        <div className="CollectionPageHeader" >
          <div className="CPHImage">
            <img src={this.state.collection.thumbnail}/>
          </div>
          <div className="CPHContent">
            <div className="CPHInfo">
              <h1 className="CPHTitle">{this.state.collection.name}</h1>
              <p style={{maxHeight: "106px",overflowY: "scroll"}}><b>Palabras clave: </b>{this.state.collection.keywords.join(", ")}</p>
            </div>
            <div className="CPHFooter">
              <div className="FooterLeft Actions">
                {this.state.session.active &&
                  <button className="actionBtn" onClick={this.likeHandler}>
                    <FontAwesomeIcon icon="thumbs-up"/> 
                    <span> {this.state.collection.actions.likes.length}</span>
                  </button>
                }
                {this.state.session.active &&
                  <button className="actionBtn" onClick={this.favoriteHandler}>
                    <FontAwesomeIcon icon="star"/>
                    <span> {this.state.collection.actions.favorites.length}</span>
                  </button>
                }
                
                <button className="actionBtn" onClick={this.shareHandler}>
                  <FontAwesomeIcon icon="share-alt"/> 
                  <span> {this.state.collection.actions.shares.length}</span>
                </button>

              </div>
              <div className="FooterRight Actions">
                <button className="actionBtn CompleteNew"><FontAwesomeIcon icon="bell"/> Suscribirse</button>
              </div>
            </div>
          </div>
          
          
        </div>
        {this.state.session.admin && (
          <div id="AdminOptions" className="Actions" style={{background:'white', border: '1px solid #E2E2E2', padding:'.7rem', paddingTop: '.3rem', marginBottom: '.7rem'}}>
            <h4 style={{marginBottom:'.5rem'}}>Acciones de administrador</h4>
            <button className="actionBtn" onClick={this.deleteHandler}>
              <span> Eliminar Colección</span>
            </button>
            
          </div>
        )}
        <div id="SocialShareContainer">
          <div className="SocialShare">
            <FacebookShareButton
              url={location.href}
              quote={this.state.collection.name.toUpperCase()+": "+this.state.collection.keywords.join(", ")}
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
              title={this.state.collection.name.toUpperCase()+": "+this.state.collection.keywords.join(", ")}
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
              title={this.state.collection.name.toUpperCase()+": "+this.state.collection.keywords.join(", ")}
              onShareWindowClose={this.shareFinishedHandler}
              className="SocialShare__share-button">
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </div>

          <div className="SocialShare">
            <WhatsappShareButton
              url={location.href}
              title={this.state.collection.name.toUpperCase()+": "+this.state.collection.keywords.join(", ")}
              onShareWindowClose={this.shareFinishedHandler}
              separator=":: "
              className="SocialShare__share-button">
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>

          <div className="SocialShare">
            <LinkedinShareButton
              url={location.href}
              title={this.state.collection.name.toUpperCase()+": "+this.state.collection.keywords.join(", ")}
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
            <RedditShareButton
              url={location.href}
              title={this.state.collection.name.toUpperCase()+": "+this.state.collection.keywords.join(", ")}
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
              title={this.state.collection.name.toUpperCase()+": "+this.state.collection.keywords.join(", ")}
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
              subject={this.state.collection.name.toUpperCase()+": "+this.state.collection.keywords.join(", ")}
              onShareWindowClose={this.shareFinishedHandler}
              body="body"
              className="SocialShare__share-button">
              <EmailIcon
                size={32}
                round />
            </EmailShareButton>
          </div>


        </div>
                 
        <h3 className="NewCounter">Noticias ({this.state.collection.newsCards.length})</h3>
        {this.state.collection.newsCards.map( (resultado, i) => <NewsCard key={"NewsCard-"+i} params={resultado} /> )}
      </div>
    );
  }
}


