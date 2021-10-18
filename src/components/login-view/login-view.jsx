import React, { useState } from 'react';
import axios from 'axios';


import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import './login-view.scss';

 function LoginView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://mysterious-plateau-44583.herokuapp.com/login', {
      Username: Username,
      Password: Password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <div className="login">
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={Username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="Password" value={Password} onChange={e => setPassword(e.target.value)} />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please provide your Password</Form.Control.Feedback>
        </Form.Group>
        <span>
          <Button variant="primary" type="submit" onClick={handleSubmit}>Log in</Button>
          {' '}
          <Link to={`/register`}>
            <Button variant="success link">Register</Button>
          </Link>
        </span>
      </Form>
    </div>
  );
}


const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (Username, Password) => dispatch(handleSubmit(Username, Password))
});

export default connect(null, mapDispatchToProps)(LoginView);
