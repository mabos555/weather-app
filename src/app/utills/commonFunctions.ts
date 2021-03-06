import { WeatherResponse } from "../store/model/weather";

export function createWeatherResponce(data: Object): WeatherResponse {
  let name = data['name'];
  let main = data['main'];
  let weather = data['weather'];
  let units = data['units'];

  if (name !== undefined && main !== undefined && weather !== undefined && weather[0] !== undefined) {
    return new WeatherResponse(name, weather[0]['description'], main['temp'], units);
  }
  return null;
}
