import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './store/store'

ReactDOM.render(
  <Provider store={store}>
  <Router>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Router>
  </Provider>,
  document.getElementById('root')
);
