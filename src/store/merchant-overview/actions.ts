import { action } from 'typesafe-actions';
import { MerchantsOverviewTypes } from './types';
import { MerchantOverview, DataStream } from '../../interfaces';

export const getMerchantsOverview = (payload: any) =>
  action(MerchantsOverviewTypes.GET_MERCHANTS_OVERVIEW, payload);

export const getMerchantsOverviewSuccess = (data: MerchantOverview[]) =>
  action(MerchantsOverviewTypes.GET_MERCHANTS_OVERVIEW_SUCCESS, data);

export const getMerchantsOverviewFailure = (error: any) =>
  action(MerchantsOverviewTypes.GET_MERCHANTS_OVERVIEW_FAILURE, error);

export const exportOverviewRequest = (payload: any) =>
  action(MerchantsOverviewTypes.EXPORT_OVERVIEW_REQUEST, payload);

export const exportOverviewSuccess = (data: DataStream) =>
  action(MerchantsOverviewTypes.EXPORT_OVERVIEW_SUCCESS, data);

export const exportOverviewFailure = (error: any) =>
  action(MerchantsOverviewTypes.EXPORT_OVERVIEW_FAILURE, error);

export const clearOverview = () =>
  action(MerchantsOverviewTypes.CLEAR_OVERVIEW);
