export default class MovieAPI {
  constructor() {
    this.imgDB = 'https://image.tmdb.org/t/p/original';
    this.url = 'https://api.themoviedb.org/3/';
    this.reqHeaders = {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_MOVIE_KEY}`,
      },
    };
  }

  getResponse = async (path, paramsObj = {}) => {
    const query = `${this.url}${path}?${new URLSearchParams(paramsObj)}`;
    const response = await fetch(query, this.reqHeaders);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error('Ошибка ' + response.status);
    }
  };

  getRatedMovies = async (page = 1, language = 'ru') => {
    try {
      const response = await this.getResponse('movie/top_rated', {
        language: language,
        page: page,
      });
      return this.parseList(response.results);
    } catch (err) {
      throw new Error('Ошибка загрузки фильмов ' + err.stack);
    }
  };

  getGenre = async (id, language = 'ru') => {
    try {
      const response = await this.getResponse('genre/movie/list', {
        language: language,
      });
      const genreName = response.genres.find((el) => el.id === id).name;
      return genreName;
    } catch (err) {
      throw new Error('Ошибка жанров ' + err.message);
    }
  };
  getSearchedList = async (searchString = '', page = 1, language = 'ru') => {
    try {
      const response = await this.getResponse('search/movie', {
        language: language,
        page: page,
        query: searchString,
      });
      return this.parseList(response.results);
    } catch (err) {
      throw new Error('Ошибка поиска фильмов ' + err.message);
    }
  };

  parseList = async (list) => {
    const parsedList = list.map(async (movie) => {
      const genres = await Promise.all(movie.genre_ids.map((id) => this.getGenre(id)));
      return {
        img: this.imgDB + movie.poster_path,
        title: movie.title,
        description: movie.overview,
        genres: genres,
        date: movie.release_date,
      };
    });
    return Promise.all(parsedList);
  };
}
