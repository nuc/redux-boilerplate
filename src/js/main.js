import React from 'react';
import History from 'react-router/lib/BrowserHistory';
import Router from './components/Router';
import { Provider } from 'react-redux';
import createStore from './lib/createStore';
import request from 'superagent';
import qs from 'qs';
import createAPI from './lib/createAPI';
import { clientApiServer } from './env';

const history = new History;
const api = createAPI(
  /**
 * Client's createRequest() method
 */
  ({ method, headers = {}, pathname, query = {}, body = {} }) => {
    pathname = pathname.replace(new RegExp(`^${clientApiServer.urlPrefix}`), '');
    var url = `${clientApiServer.urlPrefix}${pathname}`;

    return request(method, url)
      .withCredentials()
      .query(qs.stringify(query))
      .set(headers)
      .send(body);
  }
);

/* global __INITIAL_STATE__:true */
const store = createStore(api, __INITIAL_STATE__);

React.render(
  <Provider {...{ store }}>
    {() => <Router {...{ history }} />}
  </Provider>,
  document.getElementById('main')
);
