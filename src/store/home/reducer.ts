import { Reducer } from 'redux';
import { HomeState, HomeTypes } from './types';
import { AuthActionTypes } from '../auth';

export const initialState: HomeState = {
  topBarHeader: '',
};

const reducer: Reducer<HomeState> = (state = initialState, action) => {
  switch (action.type) {
    case HomeTypes.TOPBAR_HEADER:
      return {
        ...state,
        topBarHeader: action.payload,
      };

    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as homeReducer };
