/*
 * BusquedaPage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import NewsCard from 'components/NewsCard';
import './style.scss';

export default class BusquedaPage extends React.Component {
  constructor(){
    super();
    this.state = {
      busqueda: "",
      resultados: [],
    };
  }

  busquedaHandler = event => {
    let busquedaInput = event.target
    this.setState({
      busqueda: busquedaInput.value,
      resultados: [
        {title: "hols", content: "content1"},
        {title: "hola", content: "content2"},
      ]
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
          <NewsCard key={i} title={resultado.title} content={resultado.content}/>
        )}
          
      </div>
    );
  }
}
