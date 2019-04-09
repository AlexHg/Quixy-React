import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AccountFooter from 'components/AccountFooter';
import './style.scss';

export default class AccountPage extends React.Component {
    constructor({match}){
      super();
      this.state = {
        session: {
            active:false, 
            ...JSON.parse(sessionStorage.getItem("session")),
        },
      };
      console.log(match);
      console.log(this.state.session);
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
        var HistoryExample = [
            {
                date: Date.now(),
                type: "view", // View || Like || Share || Favorite || Search || Comment
                content: {
                    type: "newscard", // Newscard || Collection || Search
                    title: "Trump pisa fuerte para el cierre de la frontera con México",
                    slug: "trump-pisa-fuerte-para-el-cierre-de-la-frontera-con-mexico",
                    comment: ""
                },
            },
            {
                date: Date.now(),
                type: "view", // View || Like || Share || Favorite || Search || Comment
                content: {
                    type: "collection", // Newscard || Collection || Search
                    title: "Trump pisa fuerte para el cierre de la frontera con México",
                    slug: "trump-pisa-fuerte-para-el-cierre-de-la-frontera-con-mexico",
                    comment: ""
                },
            },
            {
                date: Date.now(),
                type: "like", // View || Like || Share || Favorite || Search || Comment
                content: {
                    type: "collection", // Newscard || Collection || Search
                    title: "Trump pisa fuerte para el cierre de la frontera con México",
                    slug: "trump-pisa-fuerte-para-el-cierre-de-la-frontera-con-mexico",
                    comment: ""
                },
            },
            {
                date: Date.now(),
                type: "comment", // View || Like || Share || Favorite || Search || Comment
                content: {
                    type: "newscard", // Newscard || Collection || Search
                    title: "Trump pisa fuerte para el cierre de la frontera con México",
                    slug: "trump-pisa-fuerte-para-el-cierre-de-la-frontera-con-mexico",
                    comment: "Hola a todos"
                },
            },
            {
                date: Date.now(),
                type: "search", // View || Like || Share || Favorite || Search || Comment
                content: {
                    type: "newscard", // Newscard || Collection || Search
                    title: "Noticias de Peña nieto",
                    slug: "Noticias de Peña nieto",
                    comment: ""
                },
            },
            {
                date: Date.now(),
                type: "view", // View || Like || Share || Favorite || Search || Comment
                content: {
                    type: "newscard", // Newscard || Collection || Search
                    title: "Trump pisa fuerte para el cierre de la frontera con México",
                    slug: "trump-pisa-fuerte-para-el-cierre-de-la-frontera-con-mexico",
                    comment: ""
                },
            },
            {
                date: Date.now(),
                type: "favorite", // View || Like || Share || Favorite || Search || Comment
                content: {
                    type: "collection", // Newscard || Collection || Search
                    title: "Trump pisa fuerte para el cierre de la frontera con México",
                    slug: "trump-pisa-fuerte-para-el-cierre-de-la-frontera-con-mexico",
                    comment: ""
                },
            },
        ]
        return HistoryExample;
    }


    capitalizeFst(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render(){

        return (
            <div className="AccountPage">
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
                        <Link to="/account/edit">Editar información</Link><br/>
                        <Link to="/account/preferences">Preferencias de usuario</Link><br/>
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
                                    
                                    {this.getHistory().map((hist, i)=>(
                                        <Link to={
                                                "/"+(hist.type=="search" && "search" || hist.content.type)+"/"+hist.content.slug
                                            } 
                                        className="HistoryElem">
                                            {hist.type == "search" && (
                                                <div>
                                                    <FontAwesomeIcon icon="search"/> Busqueda '{hist.content.title}'
                                                </div>
                                            ) || hist.type == "view" && (
                                                <div>
                                                    <FontAwesomeIcon icon={hist.content.type == "newscard" && "newspaper" || "warehouse"}/>
                                                    &nbsp;
                                                    {this.capitalizeFst(hist.content.type)} visitado
                                                    '{hist.content.title}'
                                                </div>
                                            ) || (
                                                <div>
                                                    {hist.type == 'like' && <FontAwesomeIcon icon="thumbs-up"/>}
                                                    {hist.type == 'favorite' && <FontAwesomeIcon icon="star"/>}
                                                    {hist.type == 'share' && <FontAwesomeIcon icon="share-alt"/>}
                                                    {hist.type == 'comment' && <FontAwesomeIcon icon="comment"/>}
                                                    &nbsp;
                                                    {this.capitalizeFst(hist.type)}
                                                    {hist.type=="comment" && ": '"+hist.content.comment+"'"}
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
                        <Route exact path="/account/edit">
                            <div>editar info</div>
                        </Route>
                        <Route exact path="/account/preferences">
                            <div>Preferencias de usuario</div>
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