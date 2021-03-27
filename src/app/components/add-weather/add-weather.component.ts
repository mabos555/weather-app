import { Component, OnInit, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { WeatherRequest, WeatherResponse } from 'src/app/store/model/weather';
import * as WeatherStore from "../../store";
import * as Utils from "../../utills/commonFunctions";

@Component({
  selector: 'app-add-weather',
  templateUrl: './add-weather.component.html',
  styleUrls: ['./add-weather.component.css']
})
export class AddWeatherComponent implements OnInit {

  //#region Form Fields

  addWeatherForm: FormGroup;
  cities: Array<string> = ['Kyiv', 'Tel-Aviv'];
  addButtonClicked: boolean;
  weatherData: WeatherResponse;
  // this is for creating new self components.
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;
  lockButtonAfterFinish: boolean;

  //#endregion Form Fields

  //#region Life Cycle Hooks

  constructor(private formBuilder: FormBuilder, private store: Store<WeatherStore.state>, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.CreateAddWeatherForm();

    this.store.select(state => state).subscribe((data) => {
      if (Object.keys(data).length !== 0 && !data.weather.loading && data.weather.loaded) {
        this.weatherData = Utils.createWeatherResponce(data.weather.data);
      }
    });
  }

  //#endregion Life Cycle Hooks

  //#region FormControl Getters

  get CityName(): FormControl {
    return this.addWeatherForm.controls.CityName as FormControl;
  }

  get Units(): FormControl {
    return this.addWeatherForm.controls.Units as FormControl;
  }

  //#endregion FormControl Getters

  //#region Events

  @Output()
  UnitsToParent: EventEmitter<boolean> = new EventEmitter<boolean>();

  onSubmit(): void {
    this.addButtonClicked = true;
    if (this.addWeatherForm.invalid) {
      this.markAsTouched();
    }
    else {
      let weather = this.createWeatherRequest();
      this.store.dispatch(new WeatherStore.FetchWeather(weather));
      // this code will add another self component
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AddWeatherComponent);
      this.container.createComponent(componentFactory);
      this.lockButtonAfterFinish = true;
      this.UnitsToParent.emit(this.lockButtonAfterFinish);
    }
  }

  //#endregion Events

  //#region Custom Validator

  unitsValidation(control: AbstractControl) {
    let unit = control.get('Units').value;
    if (!(unit === 'metric' || unit === 'imperial' || unit === 'standard')) {
      control.get('Units').setErrors({
        unitsFieldInvalid: true
      })
    }
    else {
      return null;
    }
  }

  //#endregion Custom Validator

  //#region Form Helper Methods

  CreateAddWeatherForm(): void {
    this.addWeatherForm = this.formBuilder.group({
      CityName: [null, Validators.required],
      Units: [null, [Validators.required]]
    }, {
      validator: this.unitsValidation
    });
  }

  markAsTouched(): void {
    if (this.Units.invalid) {
      this.Units.markAsTouched();
    }
    if (this.CityName.invalid) {
      this.CityName.markAsTouched();
    }
  }

  createWeatherRequest(): WeatherRequest {
    return new WeatherRequest(this.CityName.value, this.Units.value);
  }

  //#endregion Form Helper Methods
}
