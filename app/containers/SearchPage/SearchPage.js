/*
 * BusquedaPage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import NewsCardMini from 'components/NewsCardMini';
import BreakingNew from 'components/NewsCard';
//import {noticias} from '../../dataold.json';

import {newspapers} from '../../data.json';
import './style.scss';


export default class SearchPage extends React.Component {
  constructor(){
    super();
    this.state = {
      busqueda: "",
      searchAwait: false,
      newscards: [],
      collections: [],
    };
  }

  getNews = () => [];

  busquedaHandler = event => {
    let busquedaInput = event.target
    this.setState({busqueda: busquedaInput.value})
   
    var makeSearch = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          //this.state.searchAwait = true;
          console.log("Waiting Search: ",this.state.searchAwait)
          console.log(this.state.newscards, this.state.collections, "http://"+window.location.hostname+':8080/api/search/'+this.state.busqueda);
          //http://localhost:8080/api/search/
          fetch("http://"+window.location.hostname+':8080/api/search/'+this.state.busqueda)
          .then((response) => {
            return response.json()
          }).then((content) => {
            console.log(content)
            var newscards = content.newscards
            var collections = content.collections
            if(newscards.length == 0){
              //getMoreNC.classList="notAvaliable"
            }
            if(collections.length){
              //getMoreCC.classList="notAvaliable"
            }

            this.setState({newPageNC: true, newPageCC: true, newscards:newscards, collections:collections })
            this.state.searchAwait = false;
            console.log("Waiting Search: ",this.state.searchAwait)
          })
          
        }, 1000)
      })
    }

    if(!this.state.searchAwait){
      this.state.searchAwait = true;
      //console.log("Waiting Search: ",this.state.searchAwait)
      makeSearch();
    }    
  }

  render() { 
    return (
      <div className="feature-page news-cards-container" >
        <Helmet>
          <title>Busqueda</title>
          <meta
            name="description"
            content="Quixy | Plataforma de noticias inteligente"
          />
        </Helmet>
        <div className="SearchContainer">
          <br/>
          <TextField 
            name="busqueda"
            placeholder="Ingrese su busqueda" 
            className="searchBox"
            onChange={this.busquedaHandler}
          />
          {/*this.state.busqueda*/}

          <div className="SearchContent">

            { (this.state.collections.length != 0) && <h3>Collections</h3> }
            
            <div className="Collections">{this.state.collections.toString()}</div>
            
            { (this.state.collections.length != 0) &&
              <div style={{textAlign:'center'}}><br/><button>Cargar más</button></div>
            }

            { (this.state.newscards.length != 0) && <h3>NewsCards</h3> }
            <div className="Newscards">
              {this.state.newscards.map((NC, i)=>(
                <NewsCardMini key={"NewsCardMini-"+i} params={NC}/>
              ))}
            </div><br/>
            { (this.state.newscards.length != 0) &&
              <div style={{textAlign:'center'}}><br/><button>Cargar más</button></div>
            }
            
          </div>
        </div>
      </div>
    );
  }
}
