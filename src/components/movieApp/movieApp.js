import { Component } from "react";
import MovieList from "../movieList/movieList";
import MovieAPI from "../../services/movieApi";

export default class MovieApp extends Component {
  state = {
    movieList: [],
  };

  reloadMovies(filter = "rated", search = "") {
    const movieAPI = new MovieAPI();
    const movies =
      filter === "rated"
        ? movieAPI.getRatedMovies()
        : movieAPI.getRatedMovies();
    movies
      .then((response) => this.setState({ movieList: response }))
      .catch((err) => {
        console.log("Не получилось выполнить запрос, проверьте VPN");
        console.log(err);
      });
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
