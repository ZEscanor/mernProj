import React from 'react';
import  ReactDOM from 'react-dom';

import { Provider } from 'react-redux'; // access state from everywhere
import { createStore,applyMiddleware, compose} from 'redux';
//import {configureStore} from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
<BrowserRouter>
<App/>
</BrowserRouter>
</Provider>, document.getElementById('root'));