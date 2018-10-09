import React from 'react';
import './style.scss';


const NewsCard = ({title, content, etiquetas = []}) => (
  <article className="NewsCard">
    <h3>{title}</h3>
    <p>{content}</p>  
    {etiquetas.map( (etiqueta, i) => 
        <span key={i}>etiqueta</span>
    )}
  </article>
);

export default NewsCard;
