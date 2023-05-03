import { Component } from "react";

export default class Movie extends Component {
  static defaultProps = {
    img: require("../../img/default-img.jpg"),
    title: "TITLE",
    date: "DATE",
    description: "DESCRIPTION",
  };

  state = {};

  render() {
    const { img, title, date, genreCollection, description } = this.props;

    return (
      <li className="movie">
        <img className="movie__image" src={img} alt="movieimage" />
        <div className="movie__main">
          <h5 className="movie__title">{title}</h5>
          <div className="movie__date">{date}</div>
          <ul className="movie__genreList">
            {genreCollection.map((genre, index) => {
              return (
                <li className="movie__genre" key={index}>
                  <p>{genre}</p>
                </li>
              );
            })}
          </ul>
          <div className="movie__description">{description}</div>
        </div>
      </li>
    );
  }
}
