import * as weatherActions from "../actions/weather.actions";

export interface WeatherState {
  data: Object, // this is just for now, will fix it later
  loading: boolean,
  loaded: boolean
}

export const initialState: WeatherState = {
  data: {},
  loading: false,
  loaded: false
}

export function reducer(state = initialState, action: weatherActions.WeatherActions): WeatherState {
  switch (action.type) {
    case weatherActions.FETCH_WEATHER: {
      console.log("Reducer fetch the action, loading...");
      let currentState = { ...state, loading: true };
      console.log("the state of the reducer for fetch-weather is:", currentState);
      return currentState;
      // another way is to use Object.assign({}, state, newData);
    }
    case weatherActions.FETCH_WEATHER_SUCCESS: {
      console.log("Reducer fetch the action, loaded successfully", action.payload);
      const data = action.payload;
      let currentState = { ...state, loading: false, loaded: true, data };
      console.log("the state of the reducer for fetch-weather-success is:", currentState);
      return currentState;
      // another way is to use Object.assign({}, state, newData);
    }
    case weatherActions.FETCH_WEATHER_FAIL: {
      console.log("Reducer fetch the action, loaded fail", action.payload);
      const data = action.payload;
      let currentState = { ...state, loading: false, loaded: false, data };
      console.log("the state of the reducer for fetch-weather-fail is:", currentState);
      return currentState;
      // another way is to use Object.assign({}, state, newData);
    }
  }
}

// getter methods
export const getWeatherLoading = (state: WeatherState) => {
  return state.loading;
}
export const getWeatherLoaded = (state: WeatherState) => {
  return state.loaded;
}
export const getWeatherData = (state: WeatherState) => {
  return state.data;
}
