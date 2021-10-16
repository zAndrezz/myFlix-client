import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import  Row    from 'react-bootstrap/Row';
import  Col  from 'react-bootstrap/Col';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      
    
      <Row m={4}>
    <Col xs={12} md={8} >
      <Card  style={{ width: '18rem' }}>
        <Link to={`/movies/${movie._id}`}>
          <Card.Img className="image-container" variant="top" src={movie.ImagePath
} />
        </Link>
        <Card.Body>
          <Card.Title><h4>{movie.Title}</h4></Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary">Open</Button>
          </Link>
        </Card.Body>
      </Card>
      </Col> 

</Row>

    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};

export default MovieCard;