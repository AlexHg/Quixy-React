/*
 * BusquedaPage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import NewsCardMini from 'components/NewsCardMini';
import Collection from 'components/Collection';
import './style.scss';


export default class SearchPage extends React.Component {
  constructor(){
    super();
    this.state = {
      busqueda: "",
      searchAwaitCOL: false,
      searchAwaitNC: false,

      newscards: [],
      nlimit: 24,
      npage: 0,
      nNewPage: false,

      collections: [],
      climit:14,
      cpage:0,
      cNewPage: false,
    };
  }

  getNews = () => [];

  componentWillReceiveProps({params}){
    //console.log(params)
    /*if(params.npage > this.state.npage)
      this.setState({npage: params.npage, nNewPage: true});

    if(params.cpage > this.state.cpage)
      this.setState({cpage: params.cpage, cNewPage: true});*/
  }

  busquedaHandler = event => {
    let busquedaInput = event.target
    this.setState({busqueda: busquedaInput.value})
   
    var makeSearchNC = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          //this.state.searchAwait = true;
          console.log("Waiting Search: ",this.state.searchAwaitCOL)
          console.log(this.state.newscards, this.state.collections, "http://"+window.location.hostname+':8080/api/search/'+this.state.busqueda+"/nc/"+this.state.nlimit+"/"+this.state.npage);
          //http://localhost:8080/api/search/
          fetch("http://"+window.location.hostname+':8080/api/search/'+this.state.busqueda+"/nc/"+this.state.nlimit+"/"+this.state.npage)
            .then((response) => {
              return response.json()
            }).then((content) => {
              
              var newscards = content.newscards
              if(newscards.length == 0){
                //getMoreNC.classList="notAvaliable"
              }

              this.setState({nNewPage: true, newscards:newscards})
              this.state.searchAwaitNC = false;
              console.log("Waiting Search: ",this.state.searchAwaitNC)
              console.log(content)

            })
          
        }, 1000)
      })
    }

    var makeSearchCOL = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          //this.state.searchAwait = true;
          console.log("Waiting Search: ",this.state.searchAwaitCOL)
          console.log(this.state.collections, "http://"+window.location.hostname+':8080/api/search/'+this.state.busqueda+"/col/"+this.state.climit+"/"+this.state.cpage);
          //http://localhost:8080/api/search/
          fetch("http://"+window.location.hostname+':8080/api/search/'+this.state.busqueda+"/col/"+this.state.climit+"/"+this.state.cpage)
            .then((response) => {
              return response.json()
            }).then((content) => {
              
              var collections = content.collections
              
              if(collections.length){
                //getMoreCC.classList="notAvaliable"
              }

              this.setState({cNewPage: true, collections:collections })
              this.state.searchAwaitCOL = false;
              console.log("Waiting Search: ",this.state.searchAwaitCOL)
              console.log(content)

            })
          
        }, 1000)
      })
    }

    if(!this.state.searchAwaitNC && !this.state.searchAwaitCOL){
      this.state.searchAwaitNC = true;
      this.state.searchAwaitCOL = true;
      
      makeSearchNC();
      makeSearchCOL();

      setTimeout(() =>console.log("col ",this.state), 2000 );
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
            
            <div className="Collections">
              {this.state.collections.map((COL, i) => (
                <Collection key={"Collection-"+i} params={COL}/>
              ))}
            </div>
            
            { /*(this.state.collections.length != 0) &&
              <div style={{textAlign:'center'}}><br/><button>Cargar más</button></div>
            */}

            { (this.state.newscards.length != 0) && <h3>NewsCards</h3> }
            <div className="Newscards">
              {this.state.newscards.map((NC, i)=>(
                <NewsCardMini key={"NewsCardMini-"+i} params={NC}/>
              ))}
            </div><br/>
            {/* (this.state.newscards.length != 0) &&
              <div style={{textAlign:'center'}}><br/><button>Cargar más</button></div>
            */}
            
          </div>
        </div>
      </div>
    );
  }
}
