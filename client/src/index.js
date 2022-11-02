import React from 'react';
import  ReactDOM from 'react-dom';

import { Provider } from 'react-redux'; // access state from everywhere
import { createStore,applyMiddleware, compose} from 'redux';
//import {configureStore} from '@reduxjs/toolkit';

import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>, document.getElementById('root'));