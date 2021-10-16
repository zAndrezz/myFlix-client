import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from "react-router-dom";


import './registration-view.scss';

export function RegistrationView(props) {
  const [name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");


  const [nameError, setNameError] = useState({});
  const [UsernameError, setUsernameError] = useState({});
  const [PasswordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [BirthdayError, setBirthdayError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
      axios.post('https://mysterious-plateau-44583.herokuapp.com/users', {
        Name: name,
        Username: Username,
        Password: Password,
        Email: email,
        Birthday: Birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user')
        });
    };
  }

  const formValidation = () => {
    let nameError = {};
    let UsernameError = {};
    let PasswordError = {};
    let emailError = {};
    let BirthdayError = {};
    let isValid = true;

    if (name === '') {
      nameError.nameEmpty = "Please enter your Name.";
      isValid = false;
    }
    if (Username.trim().length < 4) {
      UsernameError.UsernameShort = "Username incorrect. Use at least 4 characters.";
      isValid = false;
    }
    if (Password.trim().length < 5) {
      PasswordError.PasswordMissing = "Password incorrect. Use at least 5 characters.";
      isValid = false;
    }
    if (!(email && email.includes(".") && email.includes("@"))) {
      emailError.emailNotEmail = "Email address incorrect.";
      isValid = false;
    }
    if (Birthday === '') {
      BirthdayError.BirthdayEmpty = "Please enter your Birthday.";
      isValid = false;
    }
    setNameError(nameError);
    setUsernameError(UsernameError);
    setPasswordError(PasswordError);
    setEmailError(emailError);
    setBirthdayError(BirthdayError);
    return isValid;
  };

  return (
    <Form className="register justify-content-md-center">
      <Row>
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
          {Object.keys(nameError).map((key) => {
            return (
              <div key={key}>
                {nameError[key]}
              </div>
            );
          })}
        </Form.Group>
      </Row>

      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={Username} onChange={e => setUsername(e.target.value)} />
        {Object.keys(UsernameError).map((key) => {
          return (
            <div key={key}>
              {UsernameError[key]}
            </div>
          );
        })}
      </Form.Group>

      <Row>
        <Form.Group controlId="formPassword">
          <Form.Label>Create Password:</Form.Label>
          <Form.Control type="Password" value={Password} onChange={e => setPassword(e.target.value)} />
          {Object.keys(PasswordError).map((key) => {
            return (
              <div key={key}>
                {PasswordError[key]}
              </div>
            );
          })}
        </Form.Group>
      </Row>

      <Row>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
          {Object.keys(emailError).map((key) => {
            return (
              <div key={key}>
                {emailError[key]}
              </div>
            );
          })}
        </Form.Group>
      </Row>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" value={Birthday} onChange={e => setBirthday(e.target.value)} />
        {Object.keys(BirthdayError).map((key) => {
          return (
            <div key={key}>
              {BirthdayError[key]}
            </div>
          );
        })}
      </Form.Group>

      <span>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
        {' '}
        <Link to="/">
          <Button variant="secondary" type="button">Back</Button>
        </Link>
      </span>
    </Form >
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  }),
};
export default RegistrationView;