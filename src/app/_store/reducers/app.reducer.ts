import { StoreUtil, DATA_STATE, NgrxObject} from 'ngrx-helpers';
import {APP_ACTIONS} from '../app-actions';

export interface AppState {
  readonly appData: NgrxObject<any>;
}

export const defaultAppState: AppState = {
  appData: {
    data: {},
    state: DATA_STATE.INITIAL,
  },
};

export function appDataReducer(state = defaultAppState, action) {
  switch (action.type) {
    case APP_ACTIONS.FETCH_DATA_RESOLVING:
      return StoreUtil.setResolving(state, 'appData', {});

    case APP_ACTIONS.FETCH_DATA_RESOLVED:
      return StoreUtil.setResolved(state, 'appData', action.payload.data);

    case APP_ACTIONS.FETCH_DATA_ERROR:
      return StoreUtil.setError(state, 'appData', action.payload.data.status);

    default:
      return state;
  }
}
