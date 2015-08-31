import Immutable from 'immutable';
import { Post as PostActions } from '../consts/ActionTypes';
import { getRequestActionTypes } from '../utils/helpers';
import createReducer from '../lib/createReducer';

const initialState = Immutable.fromJS({});

const [
  getByIdRequest, getByIdSuccess, getByIdFailure
] = getRequestActionTypes(PostActions.getById);

export default createReducer(initialState, {
  [getByIdSuccess](state, { postId, response }) {
    const post = response.body;
    return state.merge({
      [`posts/${postId}`]: post
    });
  }
});

