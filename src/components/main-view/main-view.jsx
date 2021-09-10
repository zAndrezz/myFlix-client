import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import inceptionImage from '../../../images/inception.jpg';
import redemptionImage from '../../../images/redemption.jpg';
import gladiatorImage from '../../../images/gladiator.png';

 class MainView extends React.Component{

  constructor(){
    super();
    this.state = {
      movies: [
        {
        _id: 1,
        Title: 'Inception', 
        Description: 'hello',
        ImagePath: `${inceptionImage}`
      },

        {
         _id: 2,
         Title: 'The Shawshank Redemption', 
        Description: 'desc2...',
         ImagePath: `${redemptionImage}`
        },

        { _id: 3,
           Title: 'Gladiator', 
           Description: 'desc3...',
            ImagePath: `${gladiatorImage}`
          }
      ],
      selectedMovie: null
    };
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    console.log(inceptionImage)
    console.log(redemptionImage)
    console.log(gladiatorImage)
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

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


