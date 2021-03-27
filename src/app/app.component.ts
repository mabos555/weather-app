import { Component } from '@angular/core';
import { WeatherResponse } from './store/model/weather';
import * as Utils from "../app/utills/commonFunctions";
import * as WeatherStore from "../app/store";
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  weatherData: WeatherResponse;
  weatherArray = [];

  constructor(private store: Store<WeatherStore.state>) { }

  getUnitsFromChild(units: string) {
    this.store.select(state => state).subscribe((data) => {
      if (Object.keys(data).length !== 0 && !data.weather.loading && data.weather.loaded) {
        this.weatherData = Utils.createWeatherResponce(data.weather.data, units);
        this.weatherArray.push(this.weatherData);
        console.log("inside app the weather data is:", this.weatherData);
        console.log("inside app the weather array is:", this.weatherArray);
      }
    })
  }
}
