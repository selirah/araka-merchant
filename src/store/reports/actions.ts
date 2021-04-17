import { action } from 'typesafe-actions';
import { ReportsActionTypes } from './types';
import {
  PCESReport,
  ProxyPayReport,
  PayoutReport,
  PayoutNewRecord,
  MerchantData,
  Fee,
  DataStream,
} from '../../interfaces';

export const getPCESRequest = () => action(ReportsActionTypes.GET_PCES_REQUEST);

export const getPCESSuccess = (response: PCESReport) =>
  action(ReportsActionTypes.GET_PCES_SUCCESS, response);

export const getPCESFailure = (error: any) =>
  action(ReportsActionTypes.GET_PCES_FAILURE, error);

export const getProxyPayRequest = (payload: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_REQUEST, payload);

export const getProxyPaySuccess = (response: ProxyPayReport) =>
  action(ReportsActionTypes.GET_PROXYPAY_SUCCESS, response);

export const getProxyPayFailure = (error: any) =>
  action(ReportsActionTypes.GET_PROXYPAY_FAILURE, error);

export const getPayoutRequest = (payload: any) =>
  action(ReportsActionTypes.GET_PAYOUT_REQUEST, payload);

export const getPayoutSuccess = (response: PayoutReport | null) =>
  action(ReportsActionTypes.GET_PAYOUT_SUCCESS, response);

export const getPayoutFailure = (error: any) =>
  action(ReportsActionTypes.GET_PAYOUT_FAILURE, error);

export const postPayoutRequest = (payload: PayoutNewRecord) =>
  action(ReportsActionTypes.POST_RECORD_REQUEST, payload);

export const postPayoutSuccess = () =>
  action(ReportsActionTypes.POST_RECORD_SUCCESS);

export const postPayoutFailure = (error: any) =>
  action(ReportsActionTypes.POST_RECORD_FAILURE, error);

export const clearBooleans = () => action(ReportsActionTypes.CLEAR_BOOLEANS);

export const getMerchantsRequest = () =>
  action(ReportsActionTypes.GET_MERCHANTS_REQUEST);

export const getMerchantsSuccess = (response: MerchantData[]) =>
  action(ReportsActionTypes.GET_MERCHANTS_SUCCESS, response);

export const getMerchantsFailure = (error: any) =>
  action(ReportsActionTypes.GET_MERCHANTS_FAILURE, error);

export const getPayoutFeeRequest = (payload: any) =>
  action(ReportsActionTypes.POST_PAYOUT_FEE_REQUEST, payload);

export const getPayoutFeeSuccess = (data: Fee) =>
  action(ReportsActionTypes.POST_PAYOUT_FEE_SUCCESS, data);

export const getPayoutFeeFailure = (error: any) =>
  action(ReportsActionTypes.POST_PAYOUT_FEE_FAILURE, error);

export const clearFee = () => action(ReportsActionTypes.CLEAR_FEE);

export const exportRequest = (payload: any) =>
  action(ReportsActionTypes.EXPORT_REQUEST, payload);

export const exportSuccess = (data: DataStream) =>
  action(ReportsActionTypes.EXPORT_SUCCESS, data);

export const exportFailure = (error: any) =>
  action(ReportsActionTypes.EXPORT_FAILURE, error);
