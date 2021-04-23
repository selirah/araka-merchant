import { action } from 'typesafe-actions';
import { VASProcessedTypes } from './types';
import { VASProcessed, DataStream } from '../../interfaces';

export const getVasRequest = (payload: any) =>
  action(VASProcessedTypes.GET_VAS_REQUEST, payload);

export const getVasSuccess = (data: VASProcessed[]) =>
  action(VASProcessedTypes.GET_VAS_SUCCESS, data);

export const getVasFailure = (error: any) =>
  action(VASProcessedTypes.GET_VAS_FAILURE, error);

export const exportVASRequest = (payload: any) =>
  action(VASProcessedTypes.EXPORT_VAS_REQUEST, payload);

export const exportVASSuccess = (data: DataStream) =>
  action(VASProcessedTypes.EXPORT_VAS_FAILURE, data);

export const exportVASFailure = (error: any) =>
  action(VASProcessedTypes.EXPORT_VAS_FAILURE, error);

export const clearVAS = () => action(VASProcessedTypes.CLEAR_VAS);
