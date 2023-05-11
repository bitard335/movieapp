import { Component } from 'react';
import { Spin, Alert } from 'antd';
import Cookies from 'universal-cookie';

import MovieList from '../movieList/movieList';
import MovieAPI from '../../services/movieApi';
import MovieSearch from '../movieSearch/movieSearch';
import MovieTabs from '../movieTabs/movieTabs';
import Footer from '../footer/footer';
import { MoviesProvider } from '../contextMovies/contextMovies';
export default class MovieApp extends Component {
  state = {
    guestToken: null,
    movieList: [],
    isLoading: true,
    errorWhenLoading: false,
    tab: 'search',
    searchQuery: 'Бойцовский клуб',
    page: 1,
    totalPages: 50,
    ratedMovies: {},
  };

  movieAPI = new MovieAPI();
  cookies = new Cookies();

  changeTab = (value) => {
    this.setState(() => ({ tab: value }));
    this.changePage(1);
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
    const { tab, searchQuery, page } = this.state;
    const movies =
      tab === 'rated'
        ? this.movieAPI.getUserRatedMovies(this.cookies.get('guestSession'), page)
        : this.movieAPI.getSearchedList(searchQuery, page);
    movies
      .then((response) =>
        this.setState({ movieList: response.result, isLoading: false, totalPages: response.totalPages })
      )
      .catch((err) => {
        this.setState({ isLoading: false, errorWhenLoading: true });
        console.log('Не получилось выполнить запрос');
        console.log(err.stack);
      });
  };
  addRatedMovie = (id, rate) => {
    this.setState(({ ratedMovies }) => ({ ratedMovies: { ...ratedMovies, [id]: rate } }));
  };

  componentDidMount() {
    this.movieAPI.getGuestToken().then((guestSession) => {
      const expiresAt = new Date(guestSession.expires_at);
      const guestSessionId = guestSession.guest_session_id;
      this.cookies.set('guestSession', guestSessionId, { path: '/', expires: expiresAt });
    });

    this.reloadMovies();
  }
  componentDidUpdate(prevProps, prevState) {
    const { tab, page, searchQuery } = this.state;
    if (tab !== prevState.tab || page !== prevState.page || searchQuery !== prevState.searchQuery) this.reloadMovies();
  }

  render() {
    const { movieList, isLoading, errorWhenLoading, totalPages, page, tab, ratedMovies } = this.state;
    const loadPlug = isLoading ? (
      <div className="spinner centered">
        <Spin size="large" />
      </div>
    ) : null;
    const errorPlug = errorWhenLoading ? <Alert type="error" message="Ошибка загрузки фильмов" /> : null;
    const moviesPlug =
      movieList.length === 0 && !isLoading && !errorWhenLoading ? (
        <Alert type="warning" message="Список фильмов пуст" />
      ) : (
        <MoviesProvider
          value={{
            list: movieList,
            api: this.movieAPI,
            cookies: this.cookies,
            ratedMovies: ratedMovies,
            addRatedMovie: this.addRatedMovie,
          }}
        >
          <MovieList />
        </MoviesProvider>
      );

    return (
      <div className="movieApp">
        <MovieTabs tab={tab} changeTab={this.changeTab} />
        <MovieSearch changeTab={this.changeTab} changeSearch={this.changeSearch} />
        {loadPlug}
        {errorPlug}
        {moviesPlug}
        <Footer changePage={this.changePage} current={page} totalPages={totalPages} />
      </div>
    );
  }
}
