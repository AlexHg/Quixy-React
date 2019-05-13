import React from 'react';
import { Link, RouteHandler, Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const Colors = ["#645dcb"];

/*ModalViewer = ({location}) => {
  const { state = {} } = location;
  const { modal } = state;
  return (
    <div className="ModalViewer">
      {modal && <Link to="/">Close</Link>}
      <div>ModalViewer</div>
    </div>
  )
}*/

const onErrorImage = (image) => {
  image.onerror = "";
  image.src = "/images/noimage.gif";
  return true;
}

const SlugCreator = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to   = "aaaaeeeeiiiioooouuuunc------";
  for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

  return str;
}

const formatDate = (date) => {
  var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
  var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
  var f=new Date(date);
  return diasSemana[f.getDay()] + ", " + f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
}

const refresh = () => {
  //super().forceUpdate();
}

const NewsCard = ({params}) => {
  
  //params.slug = SlugCreator(params.title)
  
  return(
    <article className="NewsCardMini">
      
      
      <div className="NewsCardMiniBody">
        
        <div className="NewsCardMiniContent">
          <img src={params.newspaper.thumbnail} style={{height: '13px'}} />          
          
          <Link onClick={refresh()} className="NewsCardMiniTitle" to={"/newscard/"+params.slug}>
            {params.title}
          </Link>
          <span className="dateNCM">Publicado el {formatDate(params.published)}</span>
        </div>
        <div className="clip">
          <Link to={"/newscard/"+params.slug} onClick={refresh()}>
            <img className="Thumbnail" src={params.thumbnail} onError={(e)=>{e.target.onerror = null; e.target.src=require('images/imagenno.png')}}/>
          </Link>
        </div>
      </div>
    </article>
  )
};

export default NewsCard;
