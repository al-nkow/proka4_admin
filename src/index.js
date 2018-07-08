import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import store from './redux/create-store';

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);

registerServiceWorker();
