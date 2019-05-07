import React from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';



const Collection = ({params}) => {
    //params.slug = params.title.replace(/ /g,'-').toLowerCase()
    return (
        <Link className="Collection" to={"/collection/"+params.slug} >
            <img className="BackgroundImage" src={params.thumbnail} onError={(e)=>{e.target.onerror = null; e.target.src=require('images/imagenno.png')}}/>
            <div className="CollectionInfo">
                <div className="arrow"></div>
                <h3 className="title">{params.name}</h3>
                <div className="description" style={{fontSize:"13px", marginTop:".5rem"}}><b>Palabras clave: </b>{params.keywords.join(", ")}</div>
            </div>
        </Link>    
    )
};

export default Collection;