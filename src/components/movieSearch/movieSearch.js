import { Component } from "react";

export default class MovieSearch extends Component {
  render() {
    return (
      <form>
        <input className="movieSearch" placeholder="Поиск"></input>
      </form>
    );
  }
}
