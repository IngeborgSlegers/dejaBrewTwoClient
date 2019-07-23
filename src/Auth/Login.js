import React, {useState} from 'react';
import KeepModal from './KeepModal';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import './Auth.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ updateActive, setUpdateActive ] = useState(false);
  
  const updateOn = () => {
    setUpdateActive(true);
  };

  const updateOff = () => {
    setUpdateActive(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/user/signin', {
      method: 'POST',
      body: JSON.stringify({user: {
        email: email,
        password: password}}),
      headers: new Headers({
        'Content-Type': 'application/json',
      })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('data => ', data)
      console.log(data.token)
      data.error === "Passwords do not match" ? alert('Email or password is incorrect.') : props.setToken(data.token);
      updateOn(true);
    })
  }

  return(
    <div>
      <Container className="d-flex justify-content-center loginform">
        <Row>
          <Col>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
              <br />
              <FormGroup>
                <Input id="li_email" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Input id="li_password" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </FormGroup>
              <br />
              <Button type="submit">Submit</Button>
            </Form>
            <br />
            <Button className="loginbutton" onClick={props.toggleForm}>Need to create an account?</Button>
            </Col>
          </Row>
      </Container>
      {updateActive ? <KeepModal updateOff={updateOff} /> : <div></div>}
    </div>
  );
};

export default Login;