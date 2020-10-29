export enum HomeTypes {
  TOPBAR_HEADER = '@@home/TOPBAR_HEADER',
}

export type HomeState = {
  readonly topBarHeader: string;
};
