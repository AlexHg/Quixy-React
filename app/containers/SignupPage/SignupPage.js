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
  }
  // Since state and props are static,
  // there's no need to re-render this component
  shouldComponentUpdate() {
    return false;
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
