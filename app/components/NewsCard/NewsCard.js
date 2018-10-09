import React from 'react';
import './style.scss';


const NewsCard = ({params}) => (
  <article className="NewsCard">
    <div className="Header">
      <img src={params.image} className="Thumbnail"/>
      <h3>
        <a href={params.url} style={{color: "black"}}>{params.title}</a>
        <small style={{color: "gray"}}>
          <br/>
          {params.author[0] && "Escrito por: "} 
          {params.author.map( nombre => 
            <i key={nombre} >{nombre}, </i>
          )}
        </small>
      </h3>
    </div>
    <p>{params.summary_text}</p>  
    <div>
      <b>Etiquetas: </b>
      {params.keywords.map( (etiqueta, i) => 
          <span key={i}>{etiqueta}, </span>
      )}
    </div>
  </article>
);

export default NewsCard;
