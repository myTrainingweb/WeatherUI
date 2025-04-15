// weather.component.ts

import { Component } from '@angular/core';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
})
export class WeatherComponent {
  city = '';
  date = '';
  result = '';
  weatherInfo: any = null;
  loading = false;

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    if (!this.city) return alert('Please enter a city');
    this.loading = true;
    this.result = '';
    this.weatherInfo = null;

    this.weatherService.getWeather(this.city, this.date).subscribe(
      (res: any) => {
        this.loading = false;
        try {
          const jsonMatch = res.fulfillmentText.match(/{.*}/s);
          if (jsonMatch) {
            this.weatherInfo = JSON.parse(jsonMatch[0]);
            this.result = '';
          } else {
            this.result = res.fulfillmentText;
          }
        } catch (err) {
          this.result = 'Error parsing weather data';
        }
      },
      (err) => {
        this.result = 'Error fetching weather data';
        this.loading = false;
      }
    );
  }
}
