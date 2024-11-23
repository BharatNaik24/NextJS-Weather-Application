import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
  progress: 0,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    fetchWeatherRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.progress = 50;
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.progress = 100;
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchWeatherProgress: (state) => {
      state.progress = 20;
    },
  },
});

export const {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherProgress,
  fetchWeatherFailure,
} = weatherSlice.actions;

export default weatherSlice.reducer;
