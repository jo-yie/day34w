import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherAPIService {

  constructor(private httpClient: HttpClient) { }

  private weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=baf8bde025ff8bc3fcf3c3a7203cf1dc&units=metric"

  private baseUrl = "https://api.openweathermap.org/data/2.5/weather"
  private APIKey = "baf8bde025ff8bc3fcf3c3a7203cf1dc"
  private units = "metric"

  getAPI(cityName: string): Observable<any> {
    // return this.httpClient.get<any>(this.weatherUrl + cityName + this.APIKey)

    const params = new HttpParams() 
      .set('q', cityName)
      .set('appid', this.APIKey)
      .set('units', this.units)

    console.log(this.baseUrl, {params})

    return this.httpClient.get<any>(this.baseUrl, { params })

  }

}
