import React, {useState, useEffect} from 'react';
import axios from 'axios';


import { connect } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MovieCard from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { movies, user } = state;
  return { movies, user };
};

const API_ADDRESS = "https://mysterious-plateau-44583.herokuapp.com ";

function ProfileView(props) {

  const { movies, user } = props;

  const [userData, setUserData] = useState(user);
  const [form   , setForm  ] = useState(null);
  const [errors , setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]:value
    })
    if( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  //props user if they want to delete their account then deletes it
  const deleteUser = () => {
    if(confirm("Are you sure you want to delete your account?")){
      axios.delete(`${API_ADDRESS}/users/${localStorage.getItem('user')}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      }).then(response => {
        props.onLoggedOut();
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  //adds the list of favorite movies
  const showFavorites = () => {
    if(!user.FavoriteMovies || user.FavoriteMovies.length < 1){
      return (<>
        <Card.Text> Check out some movies on the home page</Card.Text>
        <Button onClick={()=> {window.open("/","_self")}}> Home</Button>
      </>);
    }
    var faves = [];
    user.FavoriteMovies.map(f => (
      faves.push(props.movies.find(m => m._id === f))
    ))
    return (<Row>
      {faves.map(m => (
        <Col md={3}  key={m._id} className="p-1">
          <MovieCard movie={m} removeMovie={id => props.removeMovie(id)}/>
        </Col>
      ))}
    </Row>);
  }


  const updateUser = (updateObject) => {
    axios.put(`${API_ADDRESS}/users/${localStorage.getItem('user')}`,
      updateObject,
      { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`} }
      ).then(response => {
        setUserData(response.data);
        props.onUpdate(response.data);
        window.open("/user","_self")
    }).catch(function (error) {
      console.log(error);
    });
  }

  const removeMovie = (id) => {
      props.removeMovie(id);
  }

  //Error checking functions
  //checks if the string is contains anything other then letters or numbers
  const isAlphaNumeric = (str) => {
    return /^(\d|\w)+$/.test(str);
  };

  //email checking function
  const isValidEmail = (mail) => {
    return /^\S+@\S+\.\S+$/.test(mail);
  }

  //function to check for erros in the form
  const findFormErrors = () => {
    const {Username, Password, PasswordConfirm, email} = form
    setErrors({});
    const newErrors = {};
    //Username Errors
    if( !(!Username || Username === "") ){
      if(!isAlphaNumeric(Username)) newErrors.Username = "Username can only be letters and numbers";
    }
    //Password Errors
    if( !(!Password || Password === "") ){
      if(Password.length < 8) newErrors.Password = "Password must be at least 8 characters long";
    }

    if(PasswordConfirm !== Password) newErrors.PasswordConfirm = "New Passwords must match"

    //Email errors
    if( !(!email || email === "") ){
      if( !isValidEmail(email)) newErrors.email = "Email does not seem to be vailid"
    }
    return newErrors;
  }

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    const newErrors = findFormErrors();

    if(Object.keys(newErrors).length > 0){
      setErrors(newErrors);
    }else{
      var updateObject = {};
      Object.keys(form).forEach(key => {
        var casedKey = key[0].toUpperCase() + key.slice(1);
        if(!!form[key] && key !== "PasswordConfirm") updateObject[casedKey] = form[key];
      });
      updateUser(updateObject);
    }
  }

  return (

    <Card>
      <Card.Body>
      <Card.Title>Profile</Card.Title>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              onChange={ e => setField('Username', e.target.value)}
              isInvalid={!!errors.Username}
              placeholder = {user.Username}
            />
            <Form.Control.Feedback type="invalid">{errors.Username}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>New Password:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="Password"
              onChange={ e => setField('Password', e.target.value)}
              isInvalid = {!!errors.Password}
            />
            <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formPasswordConfirm">
          <Form.Label>Confirm Password:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="Password"
              onChange={ e => setField('PasswordConfirm', e.target.value)}
              isInvalid = {!!errors.PasswordConfirm}
            />
            <Form.Control.Feedback type="invalid">{errors.PasswordConfirm}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder = {user.Email}
              onChange={ e => setField('email', e.target.value)}
              isInvalid = {!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Label>Enter the information you want to change then click Update</Form.Label><br/>
        <Button disabled={ !!form ? false : true} type="submit">Update</Button>
      </Form>

      </Card.Body>

      <Card.Body>
        <Card.Title>Delete Account</Card.Title>
        <Card.Text>All of your information will be deleted! There is no going back</Card.Text>
        <Button variant="danger" onClick={()=>deleteUser()}>Delete!</Button>
      </Card.Body>

      <Card.Body>
        <Card.Title>Favorite Movies</Card.Title>
        {showFavorites()}
      </Card.Body>
    </Card>
  );
}

export default connect(mapStateToProps)(ProfileView);