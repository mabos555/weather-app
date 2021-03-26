import { InjectionToken } from '@angular/core'

export const API_KEY = new InjectionToken<string>('ApiKey', {
  providedIn: 'root',
  // this is the api key I got in the mail:
  // factory: () => '0d7303c17ee3d3482cd82a2ad273a90d'
  // and this is my own:
  factory: () => '3733445e1bfa048c037e21c341fc836b'
});
