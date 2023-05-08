import { Component } from 'react';

import Movie from '../movie/movie';

export default class MovieList extends Component {
  render() {
    const { movieList } = this.props;

    const elements = movieList.map((movie, index) => {
      return <Movie key={index} {...movie} />;
    });

    return <ul className="movieList">{elements}</ul>;
  }
}
