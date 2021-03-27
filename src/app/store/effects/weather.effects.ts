import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as WeatherActions from "../actions/weather.actions";
import { Action } from "@ngrx/store";
import { WeatherService } from "../../services/weather.service"
import { Observable, of } from "rxjs";
import { switchMap, map, catchError, share, concatMap, mergeMap, debounceTime } from "rxjs/operators";

@Injectable()
export class WeatherEffects {

  constructor(private actions$: Actions, private weatherService: WeatherService) { }

  // loadWeather$: Observable<Action> = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(WeatherActions.FETCH_WEATHER),
  //     switchMap((action: any) => {
  //       console.log("inside of effect the action payload to the get service is:", action.payload);
  //       return this.weatherService.getWeatherData(action.payload).pipe(
  //         map(data => ({ type: WeatherActions.FETCH_WEATHER_SUCCESS, payload: data })),
  //         catchError((err) => {
  //           return of(new WeatherActions.FetchWeatherFail(err['message']));
  //         })
  //       );
  //     }),
  //     share()
  //   ));

  loadWeather$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.FETCH_WEATHER),
      concatMap((action: any) => {
        console.log("inside of effect the action payload to the get service is:", action.payload);
        return this.weatherService.getWeatherData(action.payload).pipe(
          map(data => ({ type: WeatherActions.FETCH_WEATHER_SUCCESS, payload: data })),
          catchError((err) => {
            return of(new WeatherActions.FetchWeatherFail(err['message']));
          })
        );
      }),
      share()
    ));
}
