import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { ToastrService } from 'ngx-toastr';
import { CONTACT_ADMINISTRATOR, ERROR, INVALID_DATA } from '../Common/constant';


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

  constructor(private weatherService: WeatherService,    public toastr: ToastrService,
  ) {}

  getWeather() {
    this.result = '';
    this.weatherInfo = null;
  
    if (!this.city.trim() || !this.date.trim()) {
      this.toastr.error(CONTACT_ADMINISTRATOR, ERROR);  

      return;
    }

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
          this.toastr.error(INVALID_DATA, ERROR);  
        }
      },
      (err) => {
        this.result = 'Error fetching weather data';
        this.loading = false;
      }
    );
  }
}
