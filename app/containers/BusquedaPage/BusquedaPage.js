/*
 * BusquedaPage
 *
 * List all the features
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import NewsCard from 'components/NewsCard';
import BreakingNew from 'components/NewsCard';
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

  highlight = (text) => {
    var inputText = document.getElementById("inputText");
    var innerHTML = inputText.innerHTML;
    var index = innerHTML.indexOf(text);
    if (index >= 0) { 
     innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
     inputText.innerHTML = innerHTML;
    }
  }

  componentDidMount = () => {
    highlight("a")
  }

  render() { 
  
    return (
      <div className="feature-page news-cards-container">
        <Helmet>
          <title>Busqueda</title>
          <meta
            name="description"
            content="Quixy | Plataforma de noticias inteligente"
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
          
        </p>
        {this.state.resultados.map( (resultado, i) => 
          <NewsCard key={resultado._id} params={resultado}/> 
        )}
          
      </div>
    );
  }
}
