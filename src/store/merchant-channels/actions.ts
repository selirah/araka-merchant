import { action } from 'typesafe-actions'
import { MerchantsChannelsTypes } from './types'
import { MerchantChannelReport, DataStream } from '../../interfaces'

export const getMerchantsChannels = (payload: any) =>
  action(MerchantsChannelsTypes.GET_MERCHANTS_CHANNELS, payload)

export const getMerchantsChannelsSuccess = (data: MerchantChannelReport) =>
  action(MerchantsChannelsTypes.GET_MERCHANTS_CHANNELS_SUCCESS, data)

export const getMerchantsChannelsFailure = (error: any) =>
  action(MerchantsChannelsTypes.GET_MERCHANTS_CHANNELS_FAILURE, error)

export const exportChannelsRequest = (payload: any) =>
  action(MerchantsChannelsTypes.EXPORT_CHANNELS_REQUEST, payload)

export const exportChannelsSuccess = (data: DataStream) =>
  action(MerchantsChannelsTypes.EXPORT_CHANNELS_SUCCESS, data)

export const exportChannelsFailure = (error: any) =>
  action(MerchantsChannelsTypes.EXPORT_CHANNELS_FAILURE, error)

export const clearChannels = () => action(MerchantsChannelsTypes.CLEAR_CHANNELS)
