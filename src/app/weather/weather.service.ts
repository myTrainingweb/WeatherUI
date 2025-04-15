import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  private apiUrl = 'https://localhost:44320/api/weather'; // Update if needed

  constructor(private http: HttpClient) {}

  getWeather(city: string, date: string): Observable<any> {
    const payload = {
      queryResult: {
        parameters: {
          geo_city: city,
          date: date || ''
        }
      }
    };    
    return this.http.post(this.apiUrl, payload);
  }
}
