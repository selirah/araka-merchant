import { VASProcessed, DataStream } from '../../interfaces';

export enum VASProcessedTypes {
  GET_VAS_REQUEST = '@@vas/GET_VAS_REQUEST',
  GET_VAS_SUCCESS = '@@vas/GET_VAS_SUCCESS',
  GET_VAS_FAILURE = '@@vas/GET_VAS_FAILURE',
  EXPORT_VAS_REQUEST = '@@vas/EXPORT_VAS_REQUEST',
  EXPORT_VAS_SUCCESS = '@@vas/EXPORT_VAS_SUCCESS',
  EXPORT_VAS_FAILURE = '@@vas/EXPORT_VAS_FAILURE',
  CLEAR_VAS = '@@vas/CLEAR_VAS',
}

export type VASProcessedState = {
  readonly vas: VASProcessed[];
  readonly loading: boolean;
  readonly error: any;
  readonly isExporting: boolean;
  readonly isExportSuccess: boolean;
  readonly isExportError: boolean;
  readonly exportStream: DataStream | undefined;
};
