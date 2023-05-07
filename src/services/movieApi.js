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

  getRatedMovies = async (page = 1, language = "ru") => {
    const path = "movie/top_rated";
    const query = `${this.url}${path}?${new URLSearchParams({
      language: language,
      page: { page },
    })}`;
    const response = await fetch(query, this.reqHeaders);
    const result = await response.json();

    if (response.ok) {
      return result.results;
    } else {
      throw new Error("Ошибка получения списка фильмов " + response.status);
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
    const path = "genre/movie/list";
    const query = `${this.url}${path}?${new URLSearchParams({
      language: language,
    })}`;
    const response = await fetch(query, this.reqHeaders);
    const responseObj = await response.json();
    const result = responseObj.genres.find((el) => el.id === id);
    if (response.ok) {
      return result.name;
    } else {
      throw new Error("Ошибка получения списка жанров " + response.status);
    }
  };
  getSearchedList = async (searchString, page = 1, language = "ru") => {
    const searchQuery = encodeURIComponent(searchString);
    const path = "search/movie";
    const query = `${this.url}${path}?${new URLSearchParams({
      language: language,
      page: page,
      query: searchQuery,
    })}`;
    const response = await fetch(query, this.reqHeaders);
    const result = response.json();

    if (response.ok) {
      return result.results;
    } else {
      throw new Error("Ошибка получения списка по поиску " + response.status);
    }
  };
}
