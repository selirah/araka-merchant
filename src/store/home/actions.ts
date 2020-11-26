import { action } from "typesafe-actions";
import { HomeTypes } from "./types";
import { Merchant, OrderResponse } from "../../interfaces";

export const paymentRequest = (payload: Merchant) =>
  action(HomeTypes.REQUEST_PAYMENT, payload);

export const paymentSuccess = (response: OrderResponse) =>
  action(HomeTypes.REQUEST_PAYMENT_SUCCESS, response);

export const paymentFailure = (error: any) =>
  action(HomeTypes.REQUEST_PAYMENT_FAILURE, error);

export const clearPaymentData = () => action(HomeTypes.CLEAR_PAYMENT_DATA);