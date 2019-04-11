import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import AccountFooter from 'components/AccountFooter';
import './style.scss';

export default class AccountPage extends React.Component {
    constructor({match}){
      super();
      this.state = {
        session: {
            active:false, 
            history: [],
            favorites: [],
            ...JSON.parse(sessionStorage.getItem("session")),
        },
      };
      //console.log(match);
      //console.log(this.state.session);
      this.getHistory();
      this.getFavorites();
    }

    componentWillMount(){    
        if(!this.state.session.active){
            this.props.history.push('/session')
        }
    }

    formatDate = (date) => {
        var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        //var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
        var f=new Date(date);
        return f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
    }

    getHistory(){
        fetch("http://"+window.location.hostname+":8080/api/auth/history",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": this.state.session._id,
                "email": this.state.session.email.toLowerCase(),
                "token": this.state.session.token,
            })
        })
        .then((response) => {
            return response.json()
        })
        .then(history => {
            
            this.state.session.history = history
            
            this.forceUpdate()
            //console.log(this.state.session.history)

        })
    }

    getFavorites(){
        fetch("http://"+window.location.hostname+":8080/api/auth/favorites",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": this.state.session._id,
                "email": this.state.session.email.toLowerCase(),
                "token": this.state.session.token,
            })
        })
        .then((response) => {
            return response.json()
        })
        .then(favorites => {
            
            this.state.session.favorites = favorites
            this.forceUpdate()
            //console.log(this.state.session.history)

        })
    }


    capitalizeFst(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render(){

        return (
            <div className="AccountPage">
                <Helmet> 
                    <title>Mi cuenta</title>
                    <meta
                        name="description"
                        content="Mi cuenta - Quixy | Plataforma de noticias inteligente"
                    />
                </Helmet>
                <div className="AccountInfo">
                    <div className="ProfileCard">
                        
                        <img src={this.state.session.photo} className="ProfileImage"/>
                        <h2 className="UserName">{this.state.session.name}</h2>   

                        <div className="UserData">
                            <li>Correo electrónico: {this.state.session.email}</li>
                            <li>Usuario desde el {this.formatDate(this.state.session.created_at)}</li>
                        </div>
                    
                    </div>
                    <nav className="UserNav">
                        <Link to="/account/history">Historial</Link><br/>
                        <Link to="/account/favorites">Favoritos</Link><br/>
                        <Link to="/account/edit">Editar información</Link><br/>
                        <Link to="/account/configuration">Configuración</Link><br/>
                        <Link to="/logout">Cerrar sesión</Link><br/>
                    </nav>
                </div>
                <div className="AccountSwitch">
                    <Switch>
                        <Route exact path="/account/(history)?">
                            <div className="History">
                                <h2>Historial de actividad</h2><br/>
                                <div className="AllHistory">
                                    
                                    {this.state.session.history.map((hist, i)=> hist != null &&(
                                        <Link to={
                                                "/"+(hist.typeData=="search" && "search" || typeof hist.content.typeData != undefined && hist.content.typeData)+"/"+hist.content.slug
                                            } 
                                            key={"history-"+i}
                                            className="HistoryElem"
                                        >
                                            {hist.typeData == "search" && (
                                                <div>
                                                    <FontAwesomeIcon icon="search"/>&nbsp;&nbsp; Busqueda '{hist.content.title}'
                                                </div>
                                            ) || hist.typeData == "view" && (
                                                <div>
                                                    <FontAwesomeIcon icon={hist.content.typeData == "newscard" && "newspaper" || "warehouse"}/>
                                                    &nbsp;&nbsp;
                                                    {this.capitalizeFst(hist.content.typeData)} visitado
                                                    '{hist.content.title}'
                                                </div>
                                            ) || (
                                                <div>
                                                    {hist.typeData == 'like' && <FontAwesomeIcon icon="thumbs-up"/>}
                                                    {hist.typeData == 'favorite' && <FontAwesomeIcon icon="star"/>}
                                                    {hist.typeData == 'share' && <FontAwesomeIcon icon="share-alt"/>}
                                                    {hist.typeData == 'comment' && <FontAwesomeIcon icon="comment"/>}
                                                    &nbsp;&nbsp;
                                                    {this.capitalizeFst(hist.typeData)}
                                                    {hist.typeData=="comment" && ": '"+hist.content.comment+"'"}
                                                    &nbsp;
                                                    realizado en '{hist.content.title}' 
                                                </div>
                                            )}
                                            <div className="HistoryDate">{this.formatDate(hist.date)}</div>
                                        </Link>
                                    ))}
                                </div>
                                
                            </div>
                        </Route>
                        <Route exact path="/account/favorites">
                            <div className="Favorites">
                                <h2>Favoritos</h2><br/>
                                {this.state.session.favorites.map((fav, i)=> fav != null &&(
                                    <Link key={"fav-"+i} to={
                                        "/"+(typeof fav.typeData != undefined && fav.typeData)+"/"+fav.slug
                                    } className="FavElem">
                                        <FontAwesomeIcon icon={fav.typeData == "newscard" && "newspaper" || "warehouse"}/>
                                        &nbsp;&nbsp;
                                        {fav.title} - {fav.typeData}
                                    </Link>
                                ))}
                            </div>
                        </Route>
                        <Route exact path="/account/edit">
                            <form className="UserDataEdit">
                                <div>
                                    <img src={this.state.session.photo} className="ProfileImage"/><br/>
                                    <input type="file" />
                                </div>
                                <FormGroup controlId="rname" bsSize="large">
                                    <ControlLabel>Nombre</ControlLabel>
                                    <FormControl
                                        //onChange={this.handleChange}
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup controlId="remail" bsSize="large">
                                    <ControlLabel>Correo electronico</ControlLabel>
                                    <FormControl
                                        //onChange={this.handleChange}
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup controlId="rpassword" bsSize="large">
                                    <ControlLabel>Contraseña</ControlLabel>
                                    <FormControl
                                        //onChange={this.handleChange}
                                        autoComplete="new-password"
                                        type="password"
                                    />
                                </FormGroup>
                                <FormGroup controlId="rpasswordRepeat" bsSize="large">
                                    <ControlLabel>Repetir contraseña</ControlLabel>
                                    <FormControl
                                        //onChange={this.handleChange}
                                        autoComplete="new-password"
                                        type="password"
                                    />
                                </FormGroup>
                            </form>
                        </Route>
                        <Route exact path="/account/configuration">
                            <div>configuración</div>
                        </Route>
                    </Switch>
                </div>
                <AccountFooter/>
            </div>
        )
    }
}