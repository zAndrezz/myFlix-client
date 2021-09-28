import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
//import inceptionImage from '../../../images/inception.jpg';
//import redemptionImage from '../../../images/redemption.jpg';
//import gladiatorImage from '../../../images/gladiator.png';

<<<<<<< Updated upstream
 class MainView extends React.Component{

  constructor(){
=======
class MainView extends React.Component {
  constructor() {
>>>>>>> Stashed changes
    super();
    this.state = {
      movies: [],
      user: null,
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
  getUsers(token) {
    axios.post(' https://mysterious-plateau-44583.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

<<<<<<< Updated upstream
 
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  SignIn(register) {
    this.setState({
      register
    });
  }


  onLoggedIn(user) {
=======
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

  onRegister(register) {
>>>>>>> Stashed changes
    this.setState({
      register: register,
    });
  }


      
  render() {
    const { movies, selectedMovie, user, register } = this.state;
  
    if (!register) return <RegistrationView SignIn={register => this.SignIn(register)} />; 

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }

}

export default MainView;


