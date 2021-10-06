import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import { Row }   from 'react-bootstrap';


export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container>
        <Row  className="justify-content-md-center">
      <Card style={{ width: '18rem' }}>
        <Link to={`/movies/${movie._id}`}>
          <Card.Img className="image-container" variant="top" src={movie.ImageURL} />
        </Link>
        <Card.Body>
          <Card.Title><h4>{movie.Title}</h4></Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary">Open</Button>
          </Link>
        </Card.Body>
      </Card>
      </Row>
      </Container>
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
