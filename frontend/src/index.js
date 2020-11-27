import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App/App.js";
import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
// import registerServiceWorker from "./registerServiceWorker";
const Store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

// registerServiceWorker();
