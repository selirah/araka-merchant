import { OrderResponse } from '../../interfaces';

export enum HomeTypes {
  IS_SUBMITTING = '@@home/IS_SUBMITTING',
  REQUEST_PAYMENT = '@@home/REQUEST_PAYMENT',
  REQUEST_PAYMENT_FAILURE = '@@home/REQUEST_PAYMENT_ERROR',
  REQUEST_PAYMENT_SUCCESS = '@@home/REQUEST_PAYMENT_SUCCESS',
  CLEAR_PAYMENT_DATA = '@@home/CLEAR_PAYMENT_DATA',
}

export type HomeState = {
  readonly isSubmitting: boolean;
  readonly error: any;
  readonly isPaymentSuccess: boolean;
  readonly isPaymentFailure: boolean;
  readonly orderResponse: OrderResponse | undefined;
};
