import Immutable from 'immutable';
import createReducer from '../lib/createReducer';
import { Homepage as HomepageActions } from '../consts/ActionTypes';
import { getRequestActionTypes } from '../utils/helpers';

const initialState = Immutable.fromJS({
  state: 'initialized'
});

const [
  promotedRequest, promotedSuccess, promotedFailure
] = getRequestActionTypes(HomepageActions.getPromoted);

export default createReducer(initialState, {
  [promotedRequest](state) {
    return state.merge({ state: 'loading'});
  },
  [promotedSuccess](state, { response }) {
    const promoted = response.body.collection;
    return state.merge({ state: 'loaded', promoted });
  },
  [promotedFailure](state) {
    return state.merge({ state: 'load_failed'});
  }
});

export function isHomepageLoaded(state) {
  return state.Homepage.get('state') !== 'initialized';
}
