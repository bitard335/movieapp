import { Component } from 'react';

import Movie from '../movie/movie';
import { MoviesConsumer } from '../contextMovies/contextMovies';

export default class MovieList extends Component {
  render() {
    return (
      <MoviesConsumer>
        {({ list, api, cookies }) => (
          <ul className="movieList">
            {list.map((movie, index) => {
              return (
                <Movie key={index} {...movie} cookies={cookies} getImage={api.getImage} addRating={api.addRating} />
              );
            })}
          </ul>
        )}
      </MoviesConsumer>
    );
  }
}
