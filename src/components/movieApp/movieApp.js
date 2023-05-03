import { Component } from "react";
import MovieList from "../movieList/movieList";

export default class MovieApp extends Component {
  state = {
    movieList: [
      {
        img: require("../../img/default-img.jpg"),
        title: "Title",
        description: "Description",
        date: "date",
        genreCollection: ["Action", "Epic"],
      },
      {
        img: require("../../img/default-img.jpg"),
        title: "Title",
        description: "Description",
        date: "date",
        genreCollection: ["Action", "Epic"],
      },
      {
        img: require("../../img/default-img.jpg"),
        title: "Title",
        description: "Description",
        date: "date",
        genreCollection: ["Action", "Epic"],
      },
      {
        img: require("../../img/default-img.jpg"),
        title: "Title",
        description: "Description",
        date: "date",
        genreCollection: ["Action", "Epic"],
      },
      {
        img: require("../../img/default-img.jpg"),
        title: "Title",
        description: "Description",
        date: "date",
        genreCollection: ["Action", "Epic"],
      },
    ],
  };

  render() {
    const { movieList } = this.state;

    return (
      <div className="movieApp">
        <MovieList movieList={movieList} />
      </div>
    );
  }
}
