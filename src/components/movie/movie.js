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
    totalPages: 0,
  };

  state = {
    isLoading: true,
    limit: 100,
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
    this.calculateSymbolsLimit(100, 22);
  }

  componentDidUpdate(prevProps) {
    const { img } = this.props;
    if (img !== prevProps.img) {
      this.updateMovieImg();
    }
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
  calculateSymbolsLimit(startLimit, lineHeight) {
    this.setState(() => {
      const mainHeightScroll = this.mainRef.scrollHeight;
      const mainHeight = this.mainRef.clientHeight;
      const diffToCut = 60 * ((mainHeightScroll - mainHeight) / lineHeight);
      console.log(diffToCut);
      return { limit: startLimit - diffToCut };
    });
  }

  render() {
    const { title, date, genres, description, movieMark, movieId, addRating, cookies } = this.props;
    const { limit, img, isLoading } = this.state;
    const shortDescription = this.shortenDescription(description, limit);

    const formatedDate = date ? format(new Date(date), 'PPP', { locale: ru }) : null;

    const markClass = classNames('movie__mark', {
      green: this.numberInRange(movieMark, 7, 10),
      yellow: this.numberInRange(movieMark, 5, 7),
      orange: this.numberInRange(movieMark, 3, 5),
      red: this.numberInRange(movieMark, 0, 3),
    });

    const rateHandler = (rate) => {
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
        <div className="movie__main" ref={(el) => (this.mainRef = el)}>
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
            <Rate onChange={rateHandler} />
          </div>
        </div>
      </li>
    );
  }
}
