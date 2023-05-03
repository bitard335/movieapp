import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MovieApp from "./components/movieApp/movieApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MovieApp />
  </React.StrictMode>
);
