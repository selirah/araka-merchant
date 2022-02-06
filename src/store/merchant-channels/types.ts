import { DataStream, MerchantChannelReport } from '../../interfaces'

export enum MerchantsChannelsTypes {
  GET_MERCHANTS_CHANNELS = '@@merchant-channels/GET_MERCHANTS_CHANNELS',
  GET_MERCHANTS_CHANNELS_SUCCESS = '@@merchant-channels/GET_MERCHANTS_CHANNELS_SUCCESS',
  GET_MERCHANTS_CHANNELS_FAILURE = '@@merchant-channels/GET_MERCHANTS_CHANNELS_FAILURE',
  EXPORT_CHANNELS_REQUEST = '@@merchant-channels/EXPORT_CHANNELS_REQUEST',
  EXPORT_CHANNELS_SUCCESS = '@@merchant-channels/EXPORT_CHANNELS_SUCCESS',
  EXPORT_CHANNELS_FAILURE = '@@merchant-channels/EXPORT_CHANNELS_FAILURE',
  CLEAR_CHANNELS = '@@merchant-channels/CLEAR_CHANNELS'
}

export type MerchantsChannelsState = {
  readonly channels: MerchantChannelReport | null
  readonly loading: boolean
  readonly error: any
  readonly isExporting: boolean
  readonly isExportSuccess: boolean
  readonly isExportError: boolean
  readonly exportStream: DataStream | undefined
}
