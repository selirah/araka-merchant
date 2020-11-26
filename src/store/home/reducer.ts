import { Reducer } from "redux";
import { HomeState, HomeTypes } from "./types";
import { AuthActionTypes } from "../auth";

export const initialState: HomeState = {
  error: undefined,
  isPaymentFailure: false,
  isPaymentSuccess: false,
  isSubmitting: false,
  orderResponse: undefined,
};

const reducer: Reducer<HomeState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.DESTROY_STATES:
      return initialState;

    case HomeTypes.REQUEST_PAYMENT:
      return {
        ...state,
        isSubmitting: true,
        error: {},
        isPaymentSuccess: false,
        isPaymentFailure: false,
        orderResponse: undefined,
      };
    case HomeTypes.REQUEST_PAYMENT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        error: {},
        isPaymentSuccess: true,
        isPaymentFailure: false,
        orderResponse: action.payload,
      };
    case HomeTypes.REQUEST_PAYMENT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
        isPaymentSuccess: false,
        isPaymentFailure: true,
        orderResponse: undefined,
      };
    case HomeTypes.CLEAR_PAYMENT_DATA:
      return {
        ...state,
        isSubmitting: false,
        error: undefined,
        isPaymentSuccess: false,
        isPaymentFailure: false,
        orderResponse: undefined,
      };
    default:
      return state;
  }
};

export { reducer as homeReducer };
