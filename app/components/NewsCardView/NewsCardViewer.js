import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const NewsCardViewer = ({location}) => {
  const { state = {} } = location;
  const { modal } = state;
  return (
    <div className="ModalViewerContainer" style={{height:"5000px"}}>
        <div className="ModalViewer">
            {modal && <a href="#" onClick={history.goBack()}>Cerrar</a>}
            {modal && <Link to="/" >Close</Link>}
           
        </div>
    </div>
  )
}

export default NewsCardViewer;