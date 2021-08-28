// Imports
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/index.css';
import App from './component/App/App';
import 'semantic-ui-css/semantic.min.css';
import store from './store/index';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


