import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';
import HomeScreen from './Views/Homescreen';
import SearchScreen from './Views/SearchScreen';
import css from '!style-loader!css-loader!sass-loader!../styles/style.scss';

render((
  <Router history={hashHistory}>
    <Route path="/" component={HomeScreen} />
		<Route path="add" component={SearchScreen} />
  </Router>
), document.getElementById('root'));