import { Component } from 'react';

import Movie from '../movie/movie';
import { MoviesConsumer } from '../contextMovies/contextMovies';

export default class MovieList extends Component {
  render() {
    return (
      <MoviesConsumer>
        {({ list, api, cookies, addRatedMovie, ratedMovies }) => (
          <ul className="movieList">
            {list.map((movie, index) => {
              return (
                <Movie
                  key={index}
                  {...movie}
                  cookies={cookies}
                  getImage={api.getImage}
                  ratedMovies={ratedMovies}
                  addRating={api.addRating}
                  addRatedMovie={addRatedMovie}
                />
              );
            })}
          </ul>
        )}
      </MoviesConsumer>
    );
  }
}
