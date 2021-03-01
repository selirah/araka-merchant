export enum UtilsActionTypes {
  SET_ACTIVE_MENU = '@@utils/SET_ACTIVE_MENU',
  SET_MENU_HEADER = '@@utils/SET_MENU_HEADER',
}

export type UtilsState = {
  readonly activeMenu: string;
  readonly menuHeader: string;
};
