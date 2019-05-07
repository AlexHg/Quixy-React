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
        uname: "",
        uemail: "",
        upassword: "",
        upasswordRepeat: "",
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
    validateLForm() {
        return this.state.uemail.length > 0 && this.state.upassword.length > 0;
    }
    /*validateRForm() {
        if(this.state.remail == null || this.state.rpassword == null || this.state.rpasswordRepeat == null) return false;
        let eplen = this.state.remail.length > 0 && this.state.rpassword.length > 0;
        let repass = this.state.rpassword.length == this.state.rpasswordRepeat.length;
        return eplen && repass;
    }*/
    handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
        }); 
        //console.log(this.state);
    }
    handleSubmitEdit = event => {
        event.preventDefault();
        fetch("http://"+window.location.hostname+':8080/api/user/id/'+this.state.session._id,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "name": this.state.uname,
            "email": this.state.uemail.toLowerCase(),
            "password": this.state.upassword,
        })
        }).then((response) => {
        return response.json()
        }).then((user) => {
        
        if(user.type == 'error' && user.alert) alert(user.message)
        else{ 
            /*this.setState({ session: user })
            console.log(this.state.session);*/
            var u = user.userData
            u.password="************";
            u.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
    
    
            sessionStorage.setItem('session',JSON.stringify(u));
            this.props.history.push('/account')
        }
        
        })
    }
    componentDidMount = ()=>{
        this.setState({uname: this.state.session.name, uemail: this.state.session.email})
        /*document.querySelector("#uname").value = this.state.session.name
        document.querySelector("#uemail").value = this.state.session.email*/
        //setTimeout(()=>console.log(this.state),1000);
    }
    componentWillMount(){    
        if(!this.state.session.active){
            this.props.history.push('/session')
            
        }
        return "hola"
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
                        {/*<Link to="/account/edit">Editar información</Link><br/>
                        <Link to="/account/configuration">Configuración</Link><br/>*/}
                        <Link to="/logout">Cerrar sesión</Link><br/>
                    </nav>
                </div>
                <div className="AccountSwitch">
                    <Switch>
                        <Route exact path="/account/">
                            <Redirect to="/account/history" />
                        </Route>
                        <Route exact path="/account/history">
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
                        <Route exact path="/account/edit" component={() =>{
                            setTimeout(() => {
                                document.querySelector("#uname").value = this.state.session.name
                                document.querySelector("#uemail").value = this.state.session.email
                            },500)
                            return (
                                <form className="UserDataEdit" onSubmit={this.handleSubmitEdit}>
                                    <div>
                                        <img src={this.state.session.photo} className="ProfileImage"/><br/>
                                        <input type="file" />
                                    </div>
                                    <div className="EditInfoFrom">
                                        <FormGroup controlId="uname" bsSize="large">
                                            <ControlLabel>Nombre</ControlLabel>
                                            <FormControl
                                                onChange={this.handleChange}
                                                id="uname"
                                                type="text"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="uemail" bsSize="large">
                                            <ControlLabel>Correo electronico</ControlLabel>
                                            <FormControl
                                                onChange={this.handleChange}
                                                id="uemail"
                                                type="text"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="upassword" bsSize="large">
                                            <ControlLabel>Contraseña</ControlLabel>
                                            <FormControl
                                                onChange={this.handleChange}
                                                autoComplete="new-password"
                                                id="upassword"
                                                type="password"
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="upasswordRepeat" bsSize="large">
                                            <ControlLabel>Repetir contraseña</ControlLabel>
                                            <FormControl
                                                onChange={this.handleChange}
                                                autoComplete="new-password"
                                                id="upasswordRepeat"
                                                type="password"
                                            />
                                        </FormGroup><br/>
                                        <Button
                                            block
                                            type="submit"
                                            bsSize="large"
                                            //disabled={!this.validateLForm()}
                                        >
                                            Editar información
                                        </Button> &nbsp;
                                    </div>
                                </form>
                            )
                        }}/>
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