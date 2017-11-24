import App from './components/app';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import React from 'react';

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('app')
);
