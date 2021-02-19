import { Reducer } from 'redux';
import { UtilsState, UtilsActionTypes } from './types';
import { menu, menuHeadings } from '../../helpers/menu';
import { AuthActionTypes } from '../auth';

export const initialState: UtilsState = {
  activeMenu: menu.DASHBOARD_YEARLY,
  menuHeader: menuHeadings.DASHBOARDS,
};

const reducer: Reducer<UtilsState> = (state = initialState, action) => {
  switch (action.type) {
    case UtilsActionTypes.SET_ACTIVE_MENU:
      return {
        ...state,
        activeMenu: action.payload,
      };
    case UtilsActionTypes.SET_MENU_HEADER:
      return {
        ...state,
        menuHeader: action.payload,
      };
    case AuthActionTypes.DESTROY_STATES:
      return initialState;
    default:
      return state;
  }
};

export { reducer as utilsReducer };
