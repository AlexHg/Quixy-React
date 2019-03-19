/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import './style.scss';

export default class SignupPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  // load in JSON data from file

  constructor(){
    super();
    this.state = {
      email: "",
      password: ""
    }
    
    

    //this.handleChange();
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(this.state);
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch('http://localhost:8080/api/auth/login',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password,
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
        localStorage.setItem('session',JSON.stringify(u));
        this.props.history.push('/')
      }
     
    })
  }
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
  }

  componentWillMount() {
    //Middleware temporal
    if(localStorage.getItem("session") != undefined)
      this.props.history.push('/')
  }
  render() {
    
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit} type="email">
          <FormGroup controlId="email" bsSize="large" method="get">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              //value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              //value={this.state.password}
              onChange={this.handleChange}
              autoComplete="new-password"
              type="password"
            />
          </FormGroup>
          <Button
            block
            type="submit"
            bsSize="large"
            //disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
