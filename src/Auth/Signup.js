import React, {useState} from 'react';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import KeepModal from './KeepModal';
import './Auth.css';


const Signup = (props) => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
    fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      body: JSON.stringify({user: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(
      (response) => response.json()
    ).then((data) => {
      console.log(data)
      props.setToken(data.token);
      updateOn(true);
    })
    .catch(err => console.log(err))
  }

  return(
    <div>
      <Container className="d-flex justify-content-center signupform">
        <Row>
          <Col>
            <h1>Signup</h1>
            <br />
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input id="su_firstName" type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </FormGroup>
              <FormGroup>
                <Input id="su_lastName" type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)}required />
              </FormGroup>
              <FormGroup>
                <Input id="su_email" type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}required />
              </FormGroup>
              <FormGroup>
                <Input id="su_password" type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="8" />
              </FormGroup>
              <Button type="submit">Submit</Button>
            </Form>
            <br />
            <Button className="signupbutton" onClick={props.toggleForm}>Already have an account?</Button>
          </Col>
        </Row>
      </Container>
      {updateActive ? <KeepModal updateOff={updateOff} /> : <div></div>}
    </div>
  )
}

export default Signup;