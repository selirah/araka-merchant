import { DataStream, MerchantOverviewReport } from '../../interfaces';

export enum MerchantsOverviewTypes {
  GET_MERCHANTS_OVERVIEW = '@@merchant-overview/GET_MERCHANTS_OVERVIEW',
  GET_MERCHANTS_OVERVIEW_SUCCESS = '@@merchant-overview/GET_MERCHANTS_OVERVIEW_SUCCESS',
  GET_MERCHANTS_OVERVIEW_FAILURE = '@@merchant-overview/GET_MERCHANTS_OVERVIEW_FAILURE',
  EXPORT_OVERVIEW_REQUEST = '@@merchant-overview/EXPORT_OVERVIEW_REQUEST',
  EXPORT_OVERVIEW_SUCCESS = '@@merchant-overview/EXPORT_OVERVIEW_SUCCESS',
  EXPORT_OVERVIEW_FAILURE = '@@merchant-overview/EXPORT_OVERVIEW_FAILURE',
  CLEAR_OVERVIEW = '@@merchant-overview/CLEAR_OVERVIEW',
}

export type MerchantsOverviewState = {
  readonly overviews: MerchantOverviewReport | null;
  readonly loading: boolean;
  readonly error: any;
  readonly isExporting: boolean;
  readonly isExportSuccess: boolean;
  readonly isExportError: boolean;
  readonly exportStream: DataStream | undefined;
};
