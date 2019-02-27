import React from 'react';
import './style.scss';


const BreakingNew = ({params}) => (
    <article className="BreakingNew">
        
        <div className="BreakingNewContainer" style={{
            background:"linear-gradient(135deg,"+params.degree[0]+", "+params.degree[1]+")"
        }}>
            <img src={params.image}/>
            <span className="RibbonLabel">¡Breaking New! - EN VIVO °</span>
            <div className="Title">
                <span>{params.title}</span>
            </div>
        </div>
        
    </article>
);

export default BreakingNew;