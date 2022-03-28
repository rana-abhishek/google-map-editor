import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const widgetDiv = document.getElementById("maps-widget");

ReactDOM.render(
  <React.StrictMode>
    <App message={widgetDiv.dataset.message} />
  </React.StrictMode>,
  widgetDiv
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
