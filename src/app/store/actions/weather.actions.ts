import { Action } from '@ngrx/store';

export const FETCH_WEATHER = "fetch_weather";
export const FETCH_WEATHER_FAIL = "fetch_weather_fail";
export const FETCH_WEATHER_SUCCESS = "fetch_weather_success";

export class FetchWeather implements Action {
  readonly type = FETCH_WEATHER;
  // for now it's any, will be changed later
  constructor(public payload: any) { }
}

export class FetchWeatherFail implements Action {
  readonly type = FETCH_WEATHER_FAIL;
  // for now it's any, will be changed later (for a message)
  constructor(public payload: any) { }
}

export class FetchWeatherSuccess implements Action {
  readonly type = FETCH_WEATHER_SUCCESS;
  // for now it's any, will be changed later (for the response)
  constructor(public payload: any) { }
}

export type WeatherActions = FetchWeather | FetchWeatherFail | FetchWeatherSuccess;
