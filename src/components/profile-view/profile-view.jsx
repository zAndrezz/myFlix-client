import React from 'react';
import axios from 'axios';
import { Button, Card, CardDeck, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import { setUser, updateUser } from '../../actions/actions';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
     
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }


  // get user method
  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://mysterious-plateau-44583.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  removeFavouriteMovie(movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');


    axios.delete(`https://mysterious-plateau-44583.herokuapp.com/users/${username}/RemoveFromFav/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    axios.put(`https://mysterious-plateau-44583.herokuapp.com/users/${username}`, {
      
      data: {
     
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      }, config
    })
      .then((response) => {
        alert('Saved Changes');
        this.setState({
         
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://mysterious-plateau-44583.herokuapp.com/users/${username}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Row className="profile-view">
        <Card className="profile-card border-0">
          <h1>Your Favorites Movies</h1>
          {FavoriteMovies.length === 0 && <div className="text-center">Empty.</div>}

          <div className="favorites-movies">
            {FavoriteMovies.length > 0 &&
              movies.map((movie) => {
                if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                  return (
                    <CardDeck key={movie._id} className="movie-card-deck">
                      <Card className="favorites-item card-content border-0" style={{ width: '16rem' }} key={movie._id}>
                        <Card.Img style={{ width: '18rem', 'padding-top': '10px' }} className="movieCard" variant="top" src={movie.ImageURL} />
                        <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                        <Button size='sm' className='profile-button remove-favorite' variant='danger' value={movie._id} onClick={() => this.removeFavouriteMovie(movie)}>
                          Remove
                        </Button>
                      </Card>
                    </CardDeck>
                  );
                }
              })}
          </div>

          <h1 className="Profile">Update Profile</h1>
          <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.handleUpdate(e,this.Username, this.Password, this.Email, this.Birthday)}>

          

0            <Form.Group controlId="formUsername">
              <Form.Label className="form-label">Username</Form.Label>
              <Form.Control type="text" placeholder="Change Username" onChange={(e) => this.setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="form-label">
                Password<span className="required">*</span>
              </Form.Label>
              <Form.Control type="password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control type="email" placeholder="Change Email" onChange={(e) => this.setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBirthday">
              <Form.Label className="form-label">Birthday</Form.Label>
              <Form.Control type="date" placeholder="Change Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
            </Form.Group>

            <Button variant='danger' type="submit">
              Update
            </Button>

            <h3>Delete your Account</h3>
            <Button variant='danger' onClick={(e) => this.handleDeleteUser(e)}>
              Delete Account
            </Button>
          </Form>

        </Card>
      </Row >
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);