import _ from 'lodash';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import * as reducers from '../reducers';
import { CALL_API } from '../consts/Misc';
import { getRequestActionTypes } from '../utils/helpers';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
const callAPIMiddleware = (api, store) => next => action => {

  const actionPayload = action[CALL_API];
  if (typeof actionPayload === 'undefined') {
    return next(action);
  }

  let { endpoint, type, ...restPayload } = actionPayload;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (typeof type !== 'string') {
    throw new Error('Specify a string action type.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data, restPayload);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [
    requestType,
    successType,
    failureType
  ] = getRequestActionTypes(type);
  next(actionWith({ type: requestType }));

  return api(endpoint).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};

function promiseMiddleware(api, { getState, dispatch }) {
  return next =>
    function _r(action) {
      /* Handle promise */
      if (action && _.isFunction(action.then)) {
        return action.then(_r);
      }

      /* Handle the async function */
      if (_.isFunction(action)) {
        return _r(action(api, getState, dispatch));
      }

      /* Final action object is here. Pass it over */
      return next(action);
    };
}

export default function (api, initialState) {
  const createStoreWithMiddleware = applyMiddleware(
    callAPIMiddleware.bind(null, api),
    promiseMiddleware.bind(null, api)
  )(createStore);
  const reducer = combineReducers(reducers);

  return createStoreWithMiddleware(reducer, initialState);
}
