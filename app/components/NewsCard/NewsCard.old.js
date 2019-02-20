import React from 'react';
import './style.scss';


const NewsCard = ({params}) => (
  <article className="NewsCard">
    <div style={{display:"flex", justifyContent:"space-between", width: 100+"%", paddingBottom:"10px"}}>
        <b>{params.company.toUpperCase()}</b>
        <span>{(new Date(params.published)).toLocaleDateString("en-US")}</span>
    </div>
    <div className="Header">      
      <img src={params.top_image} className="Thumbnail"/>
      <h3>
        <a href={params.url} style={{color: "black"}}>{params.title}</a>
        <small style={{color: "gray"}}>
          <br/>
          {params.authors[0] && "Escrito por: "} 
          {params.authors.map( nombre => 
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
