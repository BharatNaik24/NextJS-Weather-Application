// src/redux/sagas/index.js
import { all } from "redux-saga/effects";
import weatherSaga from "./weatherSaga";

export default function* rootSaga() {
  yield all([weatherSaga()]);
}
