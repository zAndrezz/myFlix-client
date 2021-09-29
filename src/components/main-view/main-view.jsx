
import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
//import inceptionImage from '../../../images/inception.jpg';

class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // Log In
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  //  Get user recent data from DB
 // getUsers(token) {
    //axios.post(' https://mysterious-plateau-44583.herokuapp.com/users', {
     // headers: { Authorization: `Bearer ${token}` }
   // })
   //   .then(response => {
        // Assign the result to the state
    //    this.setState({
     //     users: response.data
      //  });
     //   console.log(response)
    //  })
    //  .catch(function (error) {
    //    console.log(error);
    //  });
//  }

  //   Get all movies in DB
  getMovies(token) {
    axios.get(' https://mysterious-plateau-44583.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

 SignIn(register) {
    this.setState({
      register: register,
    });
  }


      
  render() {
    const { movies, selectedMovie, user, register, SignIn } = this.state;
  
    if (!register) return <RegistrationView SignIn={register => this.SignIn(register)} />; 
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          ))
        }
      </Row>
    );
    
  }


}
export default MainView;

