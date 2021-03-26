import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as WeatherActions from "../actions/weather.actions";
import { Action } from "@ngrx/store";
import { WeatherService } from "../../services/weather.service"
import { Observable, of } from "rxjs";
import { switchMap, map, catchError, share } from "rxjs/operators";

@Injectable()
export class WeatherEffects {

  constructor(private actions$: Actions, private weatherService: WeatherService) { }

  @Effect()
  loadWeather$: Observable<Action> = this.actions$.pipe(
    ofType(WeatherActions.FETCH_WEATHER),
    switchMap((action: any) => {
      return this.weatherService.getWeatherData(action.payload).pipe(
        map(data => ({ type: WeatherActions.FETCH_WEATHER_SUCCESS, payload: data })),
        catchError((err) => {
          return of(new WeatherActions.FetchWeatherFail(err['message']));
        })
      );
    }),
    share()
  );
}
