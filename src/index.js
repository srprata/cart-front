import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import cartReducer from './reducers/cartReducer'

const store = createStore(
  cartReducer/*,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/
)

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);