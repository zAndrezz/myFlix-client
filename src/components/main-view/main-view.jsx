import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
//import inceptionImage from '../../../images/inception.jpg';
//import redemptionImage from '../../../images/redemption.jpg';
//import gladiatorImage from '../../../images/gladiator.png';

 class MainView extends React.Component{

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }
  
  componentDidMount(){
    axios.get('https://mysterious-plateau-44583.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

 
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
    this.setState({
      user
    });
  }
      
  render() {
    const { movies, selectedMovie, user, register } = this.state;
  
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
              <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); }}/>
            </Col>
          ))
        }
      </Row>
    );
  }

}

export default MainView;


