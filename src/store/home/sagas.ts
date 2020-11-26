import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { HomeTypes } from "./types";
import { callApiPost } from "../../utils/api";
import { Merchant } from "../../interfaces";
import { paymentSuccess, paymentFailure } from "./actions";

function* processOrderRequest({
  payload,
}: {
  type: string;
  payload: Merchant;
}) {
  try {
    const res = yield call(callApiPost, 'payments/getpaymentpage', payload);
    yield put(paymentSuccess(res.data));
  } catch (err) {
    if (err && err.response) {
      yield put(paymentFailure(err.response.data));
    } else {
      yield put(
        paymentFailure("An error occured when making request to server")
      );
    }
  }
}

function* watchProcessOrderRequest() {
  yield takeEvery(HomeTypes.REQUEST_PAYMENT, processOrderRequest);
}

function* homeSaga(): Generator {
  yield all([fork(watchProcessOrderRequest)]);
}

export { homeSaga };
