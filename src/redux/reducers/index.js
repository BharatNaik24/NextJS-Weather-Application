import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";

const rootReducer = combineReducers({
  weather: weatherReducer, // Combine the weather reducer if any other extra is there
});

export default rootReducer;
