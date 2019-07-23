import React, {Component} from 'react';
import {Card, Button, Form, FormGroup, Input, Label} from 'reactstrap';
import './User.css';

class User extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName:'',
      lastName: '',
      email: '',
      password: '',
      login: true
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let authURL = this.state.login ? 'http://localhost:3000/user/signin' : 'http://localhost:3000/user/signup'
    fetch(authURL, {
      method: 'POST',
      body: JSON.stringify({user: this.state}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      data.error === "Passwords do not match" ? alert('Email or password is incorrect.') :
      this.props.tokenHandler(data.token)
    })
    .catch(err => console.log(err));
  }

  loginToggle = (e) => {
    e.preventDefault();
    const login = this.state.login;
    this.setState({
      login: !login,
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
  }

  render(){
    let title = this.state.login ? "Login" : "Signup";
    let toggletitle = this.state.login ? "Create an account" : "Already have an account?";
    let signupFields = !this.state.login 
      ? (
        <div>
          <FormGroup>
            <Label htmlFor="firstName">First Name:</Label><br/>
            <Input type="text" id="firstName" value={this.state.firstName} onChange={this.handleChange}/><br/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name:</Label><br/>
            <Input type="text" id="lastName" value={this.state.lastName} onChange={this.handleChange}/><br/>
          </FormGroup>
        </div>
      ) 
      : null
    return(
      <div className="authform">
        <Card>
          <Form className="cardLike" onSubmit={this.handleSubmit}>
            <h1>{title}</h1>
            <FormGroup>
              <Label htmlFor="email">Email:</Label><br/>
              <Input type="text" id="email" value={this.state.email} onChange={this.handleChange}/><br/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password:</Label><br/>
              <Input type="password" id="password" value={this.state.password} onChange={this.handleChange}/><br/>
            </FormGroup>
            {signupFields}
            <br/>
            <Button type="submit">{title}</Button>
          </Form>
          <Button onClick={this.loginToggle}>{toggletitle}</Button>
        </Card>
      </div>
    )
  }
}

export default User;