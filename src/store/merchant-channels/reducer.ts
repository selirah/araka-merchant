import { Reducer } from 'redux'
import { MerchantsChannelsState, MerchantsChannelsTypes } from './types'
import { AuthActionTypes } from '../auth'

export const initialState: MerchantsChannelsState = {
  error: undefined,
  exportStream: undefined,
  isExportError: false,
  isExportSuccess: false,
  isExporting: false,
  loading: false,
  channels: null
}

const reducer: Reducer<MerchantsChannelsState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case MerchantsChannelsTypes.GET_MERCHANTS_CHANNELS:
      return {
        ...state,
        loading: true,
        error: undefined
      }
    case MerchantsChannelsTypes.GET_MERCHANTS_CHANNELS_SUCCESS:
      return {
        ...state,
        channels: action.payload,
        loading: false
      }
    case MerchantsChannelsTypes.GET_MERCHANTS_CHANNELS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    case MerchantsChannelsTypes.CLEAR_CHANNELS:
      return {
        ...state,
        overviews: null
      }
    case MerchantsChannelsTypes.EXPORT_CHANNELS_REQUEST:
      return {
        ...state,
        isExporting: true
      }
    case MerchantsChannelsTypes.EXPORT_CHANNELS_SUCCESS:
      return {
        ...state,
        isExporting: false,
        exportStream: action.payload,
        isExportError: false,
        isExportSuccess: true,
        exportError: undefined
      }
    case MerchantsChannelsTypes.EXPORT_CHANNELS_FAILURE:
      return {
        ...state,
        isExporting: false,
        exportStream: undefined,
        isExportError: true,
        isExportSuccess: false,
        exportError: action.payload
      }

    case AuthActionTypes.DESTROY_STATES:
      return initialState
    default:
      return state
  }
}

export { reducer as channelsReducer }
