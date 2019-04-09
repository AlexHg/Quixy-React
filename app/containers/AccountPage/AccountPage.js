import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

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
                            <div>historial</div>
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