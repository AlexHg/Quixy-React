import React from 'react';
import { Link } from 'react-router-dom';
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

const checkFilters = (params) => {
  var total = params.filters.humor + params.filters.viral + params.filters.title;
  if(params.filters.humor > 0) return {color:'green'};
  else if(params.filters.viral > 0) return {color:'orange'};
  else if(total > 0 || params.filters.count_al > 1){
    return {color:'red'};
  }
  return {color:'black'};
}

const NewsCard = ({params}) => {
  
  //params.slug = SlugCreator(params.title)
  
  return(
    <article className="NewsCard">
      
      
      <div className="NewsCardBody">
        
        <div className="NewsCardContent">
          <img src={params.newspaper.thumbnail} style={{height: '25px'}} />          
          <Link className="NewsCardTitle" to={"/newscard/"+params.slug} style={checkFilters(params)}>
            {params.title}
          </Link>

          <p className="Summary">
            {params.summary}
          </p>
          <div className="publishedAtMovil">
              Publicado el {formatDate(params.published)}
          </div>
        </div>
        <div className="clip">
          <Link to={"/newscard/"+params.slug}>
            <img className="Thumbnail" src={params.thumbnail} onError={(e)=>{e.target.onerror = null; e.target.src=require('images/imagenno.png')}}/>
          </Link>
        </div>

        
      </div>
      <div className="NewsCardFooter">
        <div className="FooterLeft">
          <span className="actionCounter">
            <FontAwesomeIcon icon="thumbs-up"/> {params.actions.likes.length}
          </span>
          <span className="actionCounter">
            <FontAwesomeIcon icon="comment"/> {params.actions.comments.length}
          </span>
          <span className="actionCounter">
            <FontAwesomeIcon icon="share-alt"/> {params.actions.shares.length}
          </span>
          <span className="publishedAt">
            &nbsp;&nbsp;&nbsp;
            Publicado el {formatDate(params.published)}
          </span>
        </div>
        <div className="FooterRight">
          <Link type="btn" to={"/newscard/"+params.slug}>Leer más...</Link>
        </div>
      </div>

    </article>
  )
};

export default NewsCard;
