import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_KEY } from './tokens';
import { WeatherRequest, WeatherResponse } from '../store/model/weather';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(@Inject(API_KEY) private apiKey: string, private httpClient: HttpClient) { }

  // for now it's object to match with the ngrx as well.
  getWeatherData(data: WeatherRequest): Observable<any> {
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${data.CityName}&appid=${this.apiKey}&units=${data.Units}`;
    return this.httpClient.get(url);
  }

  // getWeatherData(data: WeatherRequest): Observable<WeatherResponse> {
  //   var url = `http://api.openweathermap.org/data/2.5/weather?q=${data.CityName}&appid=${this.apiKey}&units=${data.Units}`;
  //   console.log(url);
  //   return this.httpClient.get(url).pipe(map((res: Response) => {
  //     return res.json()['data'].map(item => {
  //       let result = new WeatherResponse(item.name, item.weather[0].description, item.main.temp);
  //       console.log("result from service:", result);
  //       return result;
  //     })
  //   }));
  // }
}
