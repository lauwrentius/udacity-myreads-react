import React from 'react';
import ReactDOM from 'react-dom';

import { Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import './index.css';
import App from './App';

const history = createHistory()

/** Index file where the app is mounted */
ReactDOM.render(
  <Router history={history}><App /></Router>,
  document.getElementById('root'))
