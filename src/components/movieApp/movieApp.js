import { Component } from "react";
import MovieList from "../movieList/movieList";
import MovieAPI from "../../services/movieApi";

export default class MovieApp extends Component {
  state = {
    movieList: [],
  };

  parseMovieList = async (movieList) => {
    const movieAPI = new MovieAPI();
    const parsedList = movieList.map(async (movie) => {
      const genres = await Promise.all(
        movie.genre_ids.map((id) => movieAPI.getGenre(id))
      );
      return {
        img: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        title: movie.title,
        description: movie.overview,
        genres: genres,
        date: movie.release_date,
      };
    });
    return Promise.all(parsedList);
  };

  reloadMovies(filter = "rated", search = "") {
    const movieAPI = new MovieAPI();
    const movies =
      filter === "rated"
        ? movieAPI.getRatedMovies()
        : movieAPI.getRatedMovies();
    movies
      .then((response) => this.parseMovieList(response))
      .then((parsedList) => this.setState(() => ({ movieList: parsedList })))
      .catch((err) =>
        console.log("Не получилось выполнить запрос, проверьте VPN")
      );
  }
  componentDidMount() {
    this.reloadMovies();
  }

  render() {
    const { movieList } = this.state;
    return (
      <div className="movieApp">
        <MovieList movieList={movieList} />
      </div>
    );
  }
}
