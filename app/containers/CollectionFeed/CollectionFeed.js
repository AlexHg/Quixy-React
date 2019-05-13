/*
 * BusquedaPage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import Collection from 'components/Collection';
import './style.scss';


export default class CollectionFeed extends React.Component {
  constructor(){
    super();
    this.state = {
      collections: [],
      climit:10000,
      cpage:0,
      cNewPage: false,
    };
  }
  componentWillMount() { 
    fetch("http://"+window.location.hostname+':8080/api/collections/get/'+this.state.climit+'/'+this.state.page)
      .then((response) => {
        return response.json()
      }).then((collections) => {
        //console.log(JSON.stringify(newscards[0]));
        this.setState({ collections: collections })
      })

    return "cargando...";
  };
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
        <div className="CollectionFeed">
          
          <div className="CollectionFeedContent">

            { (this.state.collections.length != 0) && <h3>Collections</h3> }
            
            <div className="Collections">
              {this.state.collections.map((COL, i) => COL.newsCards.length > 1 && (
                <Collection key={"Collection-"+i} params={COL}/>
              ))}
            </div>
            
            { (this.state.collections.length != 0) &&
              <div style={{textAlign:'center'}}><br/><button>Cargar más</button></div>
            }
            
          </div>
        </div>
      </div>
    );
  }
}