import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const Collection = ({params}) => (
    <div className="Collection">
        <img className="BackgroundImage" src={params.image}/>
        <div className="CollectionInfo">
            <div className="arrow"></div>
            <h3 className="title">{params.title}</h3>
            <div className="description">{params.description}</div>
        </div>
    </div>       

);

export default Collection;