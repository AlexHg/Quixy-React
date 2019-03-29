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

const NewsCard = ({params}) => {
  
  //params.slug = SlugCreator(params.title)
  
  return(
    <article className="NewsCard">
      
      
      <div className="NewsCardBody">
        
        <div className="NewsCardContent">
          <img src="http://mocaf.org.mx/wp-content/uploads/2018/03/La-Jornada.png" style={{height: '15px'}} />
          <Link className="NewsCardTitle" to={"/NewsCard/"+params.slug}>
            {params.title}
          </Link>
          <p className="Summary">{params.summary}</p>
        </div>
        <div className="clip">
          <Link to={"/NewsCard/"+params.slug}>
            <img className="Thumbnail" src={params.thumbnail} onError={(e)=>{e.target.onerror = null; e.target.src=require('images/imagenno.png')}}/>
          </Link>
        </div>
        
      </div>
      

    </article>
  )
};

export default NewsCard;
