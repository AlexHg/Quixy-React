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
      pageCount: 0,
      newPage: true,
    };
  }
  componentWillMount() { 
    fetch("http://"+window.location.hostname+':8080/api/collections/get/27/'+this.state.pageCount)
      .then((response) => {
        return response.json()
      }).then((collections) => {
        //console.log(JSON.stringify(newscards[0]));
        this.setState({ collections: collections })
      })

    return "cargando...";
  }

  getMoreColHandler = () => {
    console.log("cargar mas")
    if(this.state.newPage){
      this.setState({pageCount: this.state.pageCount+1}, () => {
        fetch("http://"+window.location.hostname+':8080/api/collections/get/27/'+this.state.pageCount)
          .then((response) => {
            return response.json()
          }).then((collections) => {
            console.log(collections.length);
            if(collections.length == 0){
              getMoreCOL.classList="notAvaliable"
              this.setState({newPage: false});
            }

            this.setState({collections: this.state.collections.concat(collections) })
          })
      })
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
        <div className="CollectionFeed">
          
          <div className="CollectionFeedContent">

            { (this.state.collections.length != 0) && <h3>Collections</h3> }
            
            <div className="Collections">
              {this.state.collections.map((COL, i) => (
                <Collection key={"Collection-"+i} params={COL}/>
              ))}
            </div>
            
            
              <div style={{textAlign:'center'}}><br/><button id="getMoreCOL" onClick={this.getMoreColHandler}>Cargar más</button></div>
          
            
          </div>
        </div>
      </div>
    );
  }
}