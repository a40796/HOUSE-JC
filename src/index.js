import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import "./styles/app.css";

let root = document.getElementById("root");
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  root
);
