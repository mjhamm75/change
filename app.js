import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './components/App';
import reducer from './reducers';

let store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
