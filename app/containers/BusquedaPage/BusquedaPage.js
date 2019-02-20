/*
 * BusquedaPage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import NewsCard from 'components/NewsCard';
//import {noticias} from '../../dataold.json';
import {newspapers} from '../../data.json';
import './style.scss';

export default class BusquedaPage extends React.Component {
  constructor(){
    super();
    this.state = {
      busqueda: "",
      resultados: this.getNews(), 
      searchAwait: false,
    };
  }

  getNews = () => [...newspapers[0].data.noticias];

  regexpSearch = (array,regexp) => {
    var filtered = []; 
    for (var i = 0; i < array.length; i++) {
        var noticia = array[i];
        if (
            regexp.test(noticia.title) || 
            regexp.test(noticia.summary_text)
        ){
            filtered.push(array[i]);
        }
    }
    
    return filtered;
  }

  busquedaHandler = event => {
    let busquedaInput = event.target

    var makeSearch = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.setState({
            busqueda: busquedaInput.value,
            resultados: this.regexpSearch(this.getNews(), new RegExp(busquedaInput.value,'i')),
          })
          this.state.searchAwait = false;
          console.log("Waiting Search: ",this.state.searchAwait)
        }, 1000)
      })
    }

    if(!this.state.searchAwait){
      this.state.searchAwait = true;
      console.log("Waiting Search: ",this.state.searchAwait)
      makeSearch();
    }    
  }

  render() { 
  
    return (
      <div className="feature-page news-cards-container">
        <Helmet>
          <title>Busqueda</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <div >
          <br/>
          <TextField 
            label="Ingrese su busqueda" 
            name="busqueda" 
            onChange={this.busquedaHandler}
          />
        </div>  
        <p>
          {this.state.busqueda && "Buscando resultados para: "}
          <b>{this.state.busqueda}</b>
        </p>
        {this.state.resultados.map( (resultado, i) => 
          <NewsCard key={i} params={resultado}/> 
        )}
          
      </div>
    );
  }
}
