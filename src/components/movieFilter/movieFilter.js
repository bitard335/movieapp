import { Component } from 'react';

export default class MovieFilter extends Component {
  render() {
    const { changeFilter } = this.props;

    return (
      <form className="movieFilter">
        <label htmlFor="search">search</label>
        <input
          type="radio"
          id="search"
          name="filter"
          className="movieFilter__button"
          onChange={() => {
            changeFilter('search');
          }}
        />
        <label htmlFor="rated">rated</label>
        <input
          id="rated"
          type="radio"
          name="filter"
          className="movieFilter__button"
          onChange={() => {
            changeFilter('rated');
          }}
        />
      </form>
    );
  }
}
