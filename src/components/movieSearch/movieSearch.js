import { Component } from 'react';
import { debounce } from 'lodash';

export default class MovieSearch extends Component {
  render() {
    const { changeSearch, changeTab } = this.props;

    const onInputHandler = (event) => {
      changeTab('search');
      const inputValue = event.target.value;
      if (event.target.value.trim()) changeSearch(inputValue);
    };

    return <input className="movieSearch__input" placeholder="Поиск" onInput={debounce(onInputHandler, 200)} />;
  }
}
