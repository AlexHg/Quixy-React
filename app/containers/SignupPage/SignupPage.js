/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Helmet } from 'react-helmet';

import AccountFooter from 'components/AccountFooter';

import './style.scss';
import {apiRestHost,apiRestHostDev} from '../../server.json';
export default class SignupPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // load in JSON data from file

  constructor(){
    super();
    this.state = { }
    //this.handleChange();
  }
  validateLForm() {
    return this.state.lemail.length > 0 && this.state.lpassword.length > 0;
  }
  validateRForm() {
    if(this.state.remail == null || this.state.rpassword == null || this.state.rpasswordRepeat == null) return false;
    let eplen = this.state.remail.length > 0 && this.state.rpassword.length > 0;
    let repass = this.state.rpassword.length == this.state.rpasswordRepeat.length;
    return eplen && repass;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    }); 
    //console.log(this.state);
  }
  handleSubmitLogin = event => {
    event.preventDefault();
    fetch("http://"+window.location.hostname+':8080/api/auth/login',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.state.lemail.toLowerCase(),
        "password": this.state.lpassword,
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
  handleSubmitRegister = event => {
    event.preventDefault();
    fetch("http://"+window.location.hostname+':8080/api/auth/register',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": this.state.rname,
        "email": this.state.remail.toLowerCase(),
        "password": this.state.rpassword,
        "confirmedPassword": this.state.rpasswordRepeat,
      })
    }).then((response) => {
      return response.json()
    }).then((user) => {      
      if(user.alert) alert(user.message)
      if(user.error) {
        let errors = "";
        user.error.forEach((i, e)=>{
          errors += "<span>"+i+"</span>" 
        })
        document.querySelector("#errorl").innerHTML = errors;
      } else {
        document.querySelector(".Register form").reset();
        this.handleShowLogin();
      }
    })
  }

  handleShowRegister(){
    document.querySelector(".Login").style="display:none"
    document.querySelector(".Register").style="display:block"
  }

  handleShowLogin(){
    document.querySelector(".Login").style="display:block"
    document.querySelector(".Register").style="display:none"
  }
  
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  componentWillMount() {
    //Middleware temporal
    if(sessionStorage.getItem("session") != undefined)
      this.props.history.push('/account')
  }
  render() {
    return (
      <div className="SignupContainer">
        <Helmet> 
          <title>Sesión</title>
          <meta
            name="description"
            content="Sesión - Quixy | Plataforma de noticias inteligente"
          />
        </Helmet>
        <div className="Signup">
          <div style={{width:'100%'}}>
            <img src={require("images/darklogo.png")} style={{width:'100px'}}/><br/><br/>
          </div>
          <div className="Login">
            <form onSubmit={this.handleSubmitLogin}>
              
              <h3>Iniciar Sesión</h3> <br/> 
              <FormGroup controlId="lemail" bsSize="large">
                <ControlLabel>Correo electronico</ControlLabel>
                <FormControl
                  autoFocus
                  //value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="lpassword" bsSize="large">
                <ControlLabel>Contraseña</ControlLabel>
                <FormControl
                  //value={this.state.password}
                  onChange={this.handleChange}
                  autoComplete="new-password"
                  type="password"
                />
              </FormGroup>
              <br/><br/>
              <Button
                block
                type="submit"
                bsSize="large"
                //disabled={!this.validateLForm()}
              >
                Iniciar sesión
              </Button> &nbsp;
              <Button onClick={this.handleShowRegister} >
                Crear una cuenta
              </Button>
              <br/>
            </form>
          </div>
          <div className="Register" style={{display:'none'}}>

            <form id="" onSubmit={this.handleSubmitRegister}>
              <h3 style={{textalign:'left'}}>Registrar cuenta</h3><br/>
              
              <FormGroup controlId="rname" bsSize="large">
                <ControlLabel>Nombre</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  type="text"
                />
              </FormGroup>
              <FormGroup controlId="remail" bsSize="large">
                <ControlLabel>Correo electronico</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  type="text"
                />
              </FormGroup>
              <FormGroup controlId="rpassword" bsSize="large">
                <ControlLabel>Contraseña</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  autoComplete="new-password"
                  type="password"
                />
              </FormGroup>
              <FormGroup controlId="rpasswordRepeat" bsSize="large">
                <ControlLabel>Repetir contraseña</ControlLabel>
                <FormControl
                  onChange={this.handleChange}
                  autoComplete="new-password"
                  type="password"
                />
              </FormGroup>
              
              <div id="errorl"><br/></div> 
              <Button
                block
                type="submit"
                bsSize="large"
                //disabled={!this.validateRForm()}
              >
                Registrarse
              </Button> &nbsp;
              <Button onClick={this.handleShowLogin} >
                Ya tengo una cuenta
              </Button>
              
            </form>
          </div>
        </div>
        <AccountFooter/>
      </div>
    );
  }
}
