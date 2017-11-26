import Root from './root';
import ReactDOM from 'react-dom';
import React from 'react';
import store from "./store";

ReactDOM.render(<Root store={store} />, document.getElementById('app'));
