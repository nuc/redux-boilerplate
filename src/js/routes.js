'use strict';

import React from 'react'; // eslint-disable-line no-unused-vars
import { Route } from 'react-router';
import Application from './components/Application';
import HomePage from './components/HomePage';
import PostPage from './components/PostPage';

export default (
  <Route component={Application}>
    <Route path="/" component={HomePage} />
    <Route path="/posts/:postId" component={PostPage} />
  </Route>
);
