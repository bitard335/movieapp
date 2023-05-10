export default class MovieAPI {
  constructor() {
    this.imgDB = 'https://image.tmdb.org/t/p/original/';
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

  getTopRatedMovies = async (page = 1, language = 'ru') => {
    try {
      const response = await this.getResponse('movie/top_rated', {
        language: language,
        page: page,
      });
      return this.parseList(response);
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
      return this.parseList(response);
    } catch (err) {
      throw new Error('Ошибка поиска фильмов ' + err.message);
    }
  };

  getUserRatedMovies = async (guestSessionId, page = 1, language = 'ru') => {
    try {
      const response = await this.getResponse(`guest_session/${guestSessionId}/rated/movies`, {
        language: language,
        page: page,
      });
      return this.parseList(response);
    } catch (err) {
      throw new Error('Ошибка выдачи оцененных фильмов ' + err.message);
    }
  };

  addRating = async (movieId, rate, sessionId) => {
    const url = `${this.url}movie/${movieId}/rating?${new URLSearchParams({ guest_session_id: sessionId })}`;
    fetch(url, {
      method: 'POST',
      headers: {
        ...this.reqHeaders.headers,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ value: rate }),
    });
  };

  getImage = async (imagePath) => {
    try {
      const url = this.imgDB + imagePath;
      const response = await fetch(url);
      const image = await response.blob();
      return image;
    } catch (err) {
      throw new Error('Ошибка загрузки изображения ' + err.message);
    }
  };
  getGuestToken = async () => {
    try {
      const response = await this.getResponse('authentication/guest_session/new');
      return response;
    } catch (err) {
      throw new Error('Ошибка авторизации', err.message);
    }
  };

  parseList = async (list) => {
    const parsedList = Promise.all(
      list.results.map(async (movie) => {
        const genres = await Promise.all(movie.genre_ids.map((id) => this.getGenre(id)));
        return {
          movieId: movie.id,
          img: movie.poster_path,
          title: movie.title,
          description: movie.overview,
          genres: genres,
          date: movie.release_date,
          movieMark: movie.vote_average,
        };
      })
    );
    return parsedList;
  };
}
