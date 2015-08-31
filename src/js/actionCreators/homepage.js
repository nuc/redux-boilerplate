import { CALL_API } from '../consts/Misc';
import { Homepage as HomepageActions } from '../consts/ActionTypes';
import { isHomepageLoaded } from '../reducers/Homepage';

export function getPromoted() {
  return {
    [CALL_API]: {
      type: HomepageActions.getPromoted,
      endpoint: '/v4/lists/homepage/promoted'
    }
  };
}

export function loadPromoted() {
  return (api, getState, dispatch) => {
    if(isHomepageLoaded(getState())) {
      return {};
    }
    return dispatch(getPromoted());
  };
}
