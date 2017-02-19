import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import css from '../styles/style.scss';
import routes from './Router/Router';
import register from './Services/ServiceWorker';

render((
  <Router history={hashHistory} routes={routes}></Router>
), document.getElementById('root'));