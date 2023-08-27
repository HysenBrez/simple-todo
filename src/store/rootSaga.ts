import { all } from "redux-saga/effects";

import userSaga from "./users/sagas";

export default function* rootSaga() {
  yield all([userSaga()]);
}
