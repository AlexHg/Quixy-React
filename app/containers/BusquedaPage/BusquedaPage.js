/*
 * BusquedaPage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import NewsCard from 'components/NewsCard';
import {noticias} from '../../data.json';
import './style.scss';

export default class BusquedaPage extends React.Component {
  constructor(){
    super();
    this.state = {
      busqueda: "",
      resultados: noticias,
    };
  }

  regexpSearch = (array,regexp) => {
    var filtered = [];
    for (var i = 0; i < array.length; i++) {
        var noticia = array[i].noticia[0];
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
    this.setState({
      busqueda: busquedaInput.value,
      resultados: this.regexpSearch(noticias, new RegExp(busquedaInput.value,'i')),
    })
  }

  render() { 
  
    return (
      <div className="feature-page">
        <Helmet>
          <title>Busqueda</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <h1>Busqueda</h1>
        <div>
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
          <NewsCard key={i} params={resultado.noticia[0]}/>
        )}
          
      </div>
    );
  }
}
