import React from 'react';
import './style.scss';


const BreakingNew = ({params}) => (
    <article className="BreakingNew">
        
        <div className="BreakingNewContainer" style={{
            //background:"linear-gradient(135deg,"+params.degree[0]+", "+params.degree[1]+")"
        }}>
            <img className="BackgroundImage" src={params.image} onError={(e)=>{e.target.onerror = null; e.target.src=require('images/imagenno.png')}}/>
            <span className="RibbonLabel">¡Breaking New!</span>
            <div className="Title">
                <span>{params.title}</span>
            </div>
        </div>
        
    </article>
);

export default BreakingNew;