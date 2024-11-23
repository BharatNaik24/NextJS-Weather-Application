import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
} from "../reducers/weatherReducer";

// API call to fetching one day weather data
function* fetchWeather(action) {
  try {
    const response = yield call(
      axios.get,
      `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${action.payload.city}&appid=0c65cf51708626a7e1cf39e0738c483b`
    );
    console.log(response);
    yield put(fetchWeatherSuccess(response.data));
  } catch (error) {
    yield put(fetchWeatherFailure(error.message));
  }
}

// Watcher for FETCH_WEATHER_REQUEST action
function* watchWeatherRequests() {
  yield takeEvery(fetchWeatherRequest.type, fetchWeather); // Uses fetchWeatherRequest action
}

export default watchWeatherRequests;
