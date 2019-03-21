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
  
  params.slug = SlugCreator(params.title)
  
  return(
    <article className="NewsCard" style={{background:"no-repeat left top, linear-gradient("+Colors[Math.floor(Math.random() * Colors.length)]+", rgba(0,0,0,0))"}}>
      <div className="Actions">
        <div className="ActionsContainer">
          <div className="ActionsList">
            <a href="#" className="Action"><FontAwesomeIcon icon="star"  /></a> &nbsp;&nbsp;
            <a href="#" className="Action"><FontAwesomeIcon icon="list-alt" /></a> &nbsp;&nbsp;
            <a href={params.url} className="Action" target="_blank"><FontAwesomeIcon icon="link" /></a>
          </div>
        </div>
      </div>
      <img className="Thumbnail" src={params.thumbnail} />
      
      <Link className="router-link" to={"/NewsCard/"+params.slug}>
        <div className="NewsCardContainer">
          <div className="Header">      
            <h4 className="Title">
              <span title={params.title}></span>
            </h4>
          </div>
        </div>  
      </Link>
      {/*</a>*/}
    </article>
  )
};

export default NewsCard;
