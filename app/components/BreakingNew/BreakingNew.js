import React from 'react';
import { BrowserRouter as Router, Link} from "react-router-dom";
import './style.scss';


const BreakingNew = ({params}) => {
    return (
        <Link className="BreakingNew" to={"/newscard/"+params.slug}>
            
            <div className="BreakingNewContainer" style={{
                //background:"linear-gradient(135deg,"+params.degree[0]+", "+params.degree[1]+")"
            }}>
                <img className="BackgroundImage" src={params.thumbnail} onError={(e)=>{e.target.onerror = null; e.target.src=require('images/imagenno.png')}}/>
                <span className="RibbonLabel">¡Breaking New!</span>
                <div className="Title">
                    <span>{params.title}</span>
                </div>
            </div>
            
        </Link>
    )
}

export default BreakingNew;