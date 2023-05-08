import { Component } from 'react';
import { Spin, Alert } from 'antd';

import MovieList from '../movieList/movieList';
import MovieAPI from '../../services/movieApi';
import MovieSearch from '../movieSearch/movieSearch';
import MovieFilter from '../movieFilter/movieFilter';
import Footer from '../footer/footer';
export default class MovieApp extends Component {
  state = {
    movieList: [],
    isLoading: true,
    errorWhenLoading: false,
    filter: 'rated',
    searchQuery: '',
    page: 1,
  };

  movieAPI = new MovieAPI();

  changeFilter = (value) => {
    this.setState(() => ({ filter: value }));
  };
  changePage = (value) => {
    this.setState(() => ({ page: value }));
  };
  changeSearch = (value) => {
    this.setState(() => ({ searchQuery: value }));
  };

  reloadMovies = () => {
    this.setState(() => ({
      isLoading: true,
      movieList: [],
    }));
    const { filter, searchQuery, page } = this.state;
    const movies =
      filter === 'rated' ? this.movieAPI.getRatedMovies(page) : this.movieAPI.getSearchedList(searchQuery, page);
    movies
      .then((response) => this.setState({ movieList: response, isLoading: false }))
      .catch((err) => {
        this.setState({ isLoading: false, errorWhenLoading: true });
        console.log('Не получилось выполнить запрос');
        console.log(err.stack);
      });
  };

  componentDidMount() {
    this.reloadMovies();
  }
  componentDidUpdate(prevProps, prevState) {
    const { filter, page, searchQuery } = this.state;
    if (filter !== prevState.filter || page !== prevState.page || searchQuery !== prevState.searchQuery)
      this.reloadMovies();
  }

  render() {
    const { movieList, isLoading, errorWhenLoading } = this.state;
    const loadPlug = isLoading ? <Spin /> : null;
    const errorPlug = errorWhenLoading ? <Alert type="error" message="Ошибка загрузки фильмов" /> : null;
    const moviesPlug =
      movieList.length == 0 && !isLoading && !errorWhenLoading ? (
        <Alert type="warning" message="Список фильмов пуст" />
      ) : (
        <MovieList movieList={movieList} />
      );
    return (
      <div className="movieApp">
        <MovieFilter changeFilter={this.changeFilter} />
        <MovieSearch changeFilter={this.changeFilter} changeSearch={this.changeSearch} />
        {loadPlug}
        {errorPlug}
        {moviesPlug}
        <Footer changePage={this.changePage} />
      </div>
    );
  }
}
