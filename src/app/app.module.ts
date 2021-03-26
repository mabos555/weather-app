import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms/';

import { AppComponent } from './app.component';
import { WeatherService } from './services/weather.service';
import { AddWeatherComponent } from './components/add-weather/add-weather.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from "@ngrx/effects";
import { reducers } from './store/reducers';
import { effects } from './store/effects';

@NgModule({
  declarations: [
    AppComponent,
    AddWeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ weather: reducers.weather }),
    EffectsModule.forRoot(effects)
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
