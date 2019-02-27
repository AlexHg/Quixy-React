import React from 'react';
import './style.scss';

const Colors = ["#645dcb"];

const NewsCard = ({params}) => (
  
  <article 
      className="NewsCard" 
      style={
        {background:"no-repeat left top, linear-gradient("+Colors[Math.floor(Math.random() * Colors.length)]+", rgba(0,0,0,0))"}
      }>
    <div className="Actions">
      <div className="ActionsContainer">
        <div className="ActionsList">
          <a href="#">X</a> &nbsp;&nbsp;
          <a href="#">X</a>
        </div>
      </div>
    </div>
    <img className="Thumbnail" src={params.top_image} />
    <a href={params.url}>
      <div className="NewsCardContainer">
        <div className="Header">      
          <h4 className="Title">
            <span title={params.title}></span>
          </h4>
        </div>
      </div>  
    </a>
     
  </article>
);

export default NewsCard;
