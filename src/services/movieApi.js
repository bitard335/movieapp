export default class MovieAPI {
  constructor() {
    this.imgDB = "https://image.tmdb.org/t/p/original/";
    this.url = "https://api.themoviedb.org/3/";
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
      throw new Error("Ошибка " + response.status);
    }
  };

  getRatedMovies = async (page = 1, language = "ru") => {
    try {
      const response = await this.getResponse("movie/top_rated", {
        language: language,
        page: { page },
      });
      return this.parseList(response.results);
    } catch (err) {
      console.log(err.message);
      console.log(err.stack);
    }
  };
  getImage = async (imgPath) => {
    const response = await fetch(this.imgDB + imgPath);
    const resultImg = await response.blob();

    if (response.ok) {
      return resultImg;
    } else {
      throw new Error("Ошибка получения изображения " + response.status);
    }
  };
  getGenre = async (id, language = "ru") => {
    try {
      const response = await this.getResponse("genre/movie/list", {
        language: language,
      });
      const genreName = response.genres.find((el) => el.id === id).name;
      return genreName;
    } catch (err) {
      console.log(err.message);
      console.log(err.stack);
    }
  };
  getSearchedList = async (searchString, page = 1, language = "ru") => {
    try {
      const searchQuery = encodeURIComponent(searchString);
      const response = await this.getResponse("search/movie", {
        language: language,
        page: page,
        query: searchQuery,
      });
      return this.parseList(response.results);
    } catch (err) {
      console.log(err.message);
      console.log(err.stack);
    }
  };

  parseList = async (list) => {
    const parsedList = list.map(async (movie) => {
      const genres = await Promise.all(
        movie.genre_ids.map((id) => this.getGenre(id))
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
}
