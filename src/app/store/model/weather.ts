export class WeatherRequest {
  CityName: string;
  Units: string;

  constructor(cityName: string, units: string) {
    this.CityName = cityName;
    this.Units = units;
  }
}

export class WeatherResponse {
  Name: string;
  Description: string;
  Temp: number;
  UnitsSymbol: string;

  constructor(name: string, desc: string, temp: number, units: string) {
    this.Description = desc;
    this.Temp = temp;
    this.Name = name;
    this.setUnitsSymbol(units);
  }

  private setUnitsSymbol(units: string): void {
    if (units === 'metric')
      this.UnitsSymbol = 'C';
    else if (units === 'standard')
      this.UnitsSymbol = 'K';
    else if (units === 'imperial')
      this.UnitsSymbol = 'F';
    else
      this.UnitsSymbol = '';
  }
}
