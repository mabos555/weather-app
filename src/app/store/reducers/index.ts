import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
import * as weatherReducer from "./weather.reducers";

// the whole application state:
export interface state {
  weather: weatherReducer.WeatherState
}

// register the reducer functions
export const reducers: ActionReducerMap<state> = {
  weather: weatherReducer.reducer
}

// select the part of the state that we need
// "weather" will be injected by the app.module
export const selectWeatherState = createFeatureSelector("weather");

// get the state slices as needed:
export const getWatherStateData = createSelector(selectWeatherState, weatherReducer.getWeatherData);
export const getWatherStateLoading = createSelector(selectWeatherState, weatherReducer.getWeatherLoading);
export const getWatherStateLoaded = createSelector(selectWeatherState, weatherReducer.getWeatherLoaded);
