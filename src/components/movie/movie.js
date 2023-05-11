import { Component } from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Rate, Spin } from 'antd';
import classNames from 'classnames';

export default class Movie extends Component {
  static defaultProps = {
    title: 'TITLE',
    date: 'DATE',
    description: 'DESCRIPTION',
    totalPages: 50,
  };

  state = {
    isLoading: true,
    img: '',
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

  numberInRange(num, min, max) {
    return num > min && num <= max;
  }

  componentDidMount() {
    this.updateMovieImg();
  }

  componentDidUpdate(prevProps) {
    const { img } = this.props;
    if (img !== prevProps.img) this.updateMovieImg();
  }

  updateMovieImg() {
    const { getImage, img } = this.props;

    this.setState({ isLoading: true });
    getImage(img).then((img) => {
      if (img) {
        const urlImg = URL.createObjectURL(img);
        this.setState(() => ({ img: urlImg, isLoading: false }));
      }
    });
  }

  render() {
    const { title, date, genres, description, movieMark, movieId, addRating, cookies, addRatedMovie, ratedMovies } =
      this.props;
    const { img, isLoading } = this.state;
    const shortDescription = this.shortenDescription(description, 80);

    const rate = movieId in ratedMovies ? ratedMovies[movieId] : 0;

    const formatedDate = date ? format(new Date(date), 'PPP', { locale: ru }) : null;

    const markClass = classNames('movie__mark', {
      green: this.numberInRange(movieMark, 7, 10),
      yellow: this.numberInRange(movieMark, 5, 7),
      orange: this.numberInRange(movieMark, 3, 5),
      red: this.numberInRange(movieMark, 0, 3),
    });

    const rateHandler = (rate) => {
      addRatedMovie(movieId, rate);
      addRating(movieId, rate, cookies.get('guestSession'));
      console.log(`Фильм ${movieId} оценен на ${rate}`);
    };

    const imgPlug = isLoading ? (
      <Spin size="large" className="movie__image centered" />
    ) : (
      <img className="movie__image" src={img} alt="movieimage" />
    );
    return (
      <li className="movie">
        {imgPlug}
        <div className="movie__main mobile">
          <header className="movie__header">
            {imgPlug}
            <div>
              <h5 className="movie__title">{title}</h5>
              <div className={markClass}>{movieMark != 10 ? movieMark.toFixed(1) : movieMark}</div>
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
            </div>
          </header>
          <div className="movie__description">{shortDescription}</div>
          <div className="movie__userRate">
            <Rate count={10} style={{ fontSize: 15 }} value={rate} onChange={rateHandler} />
          </div>
        </div>
        <div className="movie__main">
          <header className="movie__header">
            <h5 className="movie__title">{title}</h5>
            <div className={markClass}>{movieMark != 10 ? movieMark.toFixed(1) : movieMark}</div>
          </header>
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
          <div className="movie__userRate">
            <Rate count={10} style={{ fontSize: 15 }} value={rate} onChange={rateHandler} />
          </div>
        </div>
      </li>
    );
  }
}
