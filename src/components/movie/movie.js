import { Component } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default class Movie extends Component {
  static defaultProps = {
    img: require('../../img/default-img.jpg'),
    title: 'TITLE',
    date: 'DATE',
    description: 'DESCRIPTION',
  };

  state = {
    isLoading: true,
  };

  shortenDescription = (description, maxlength) => {
    if (description.length <= maxlength) {
      return description;
    } else {
      const words = description.split(' ');
      let shortDesc = '';
      words.forEach((word) => {
        if (shortDesc.length <= maxlength) shortDesc += word + ' ';
      });
      return shortDesc + '...';
    }
  };

  render() {
    const { img, title, date, genres, description } = this.props;
    const shortDescription = this.shortenDescription(description, 120);

    const formatedDate = date ? format(new Date(date), 'PPP', { locale: ru }) : null;

    return (
      <li className="movie">
        <img className="movie__image" src={img} alt="movieimage" />
        <div className="movie__main">
          <h5 className="movie__title">{title}</h5>
          <div className="movie__date">{formatedDate}</div>
          <ul className="movie__genreList">
            {genres.map((genre, index) => {
              return (
                <li className="movie__genre" key={index}>
                  {genre}
                </li>
              );
            })}
          </ul>
          <div className="movie__description">{shortDescription}</div>
        </div>
      </li>
    );
  }
}
