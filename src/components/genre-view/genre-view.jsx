import React from 'react';
import  Button  from 'react-bootstrap/Button';



export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    console.log(this.props, 'props')

    return (
      <div className="genre-view">

        <div className="genre-name">
          <h1>
            <span className="value">{genre.Name}</span>
          </h1>
        </div>
        <div className="genre-description">
          <span className="value">{genre.Description}</span>
        </div>
        <div className="button-space"></div>
        <Button variant="primary" onClick={() => { onBackClick(null) }}>Back</Button>

      </div>
    );
  }
}

export default GenreView;