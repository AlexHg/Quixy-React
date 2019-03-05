import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const Collection = ({params}) => (
    <div className="Collection">
        <div className="Actions">
            <div className="ActionsContainer">
                <div className="ActionsList">
                    <a href="#" className="Action"><FontAwesomeIcon icon="star"  /></a> &nbsp;&nbsp;
                    <a href="#" className="Action"><FontAwesomeIcon icon="list-alt" /></a>
                </div>
            </div>
        </div>
        <img className="BackgroundImage" src={params.image}/>
        <div className="CollectionInfo">
            <div className="arrow"></div>
            <h3 className="title">{params.title}</h3>
            <div className="description">{params.description}</div>
        </div>
    </div>       

);

export default Collection;