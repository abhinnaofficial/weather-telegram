// src/weather.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class WeatherService {
    constructor(private readonly httpService: HttpService) { }

    getWeather(city: string): Observable<string> {
        const apiKey = '32e794fb6f5859040247c0b2d6fac4c8';
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        return this.httpService.get(apiUrl).pipe(
            map((response: AxiosResponse) => {
                const weatherDescription = response.data.weather[0]?.description || 'Not available';
                return `Weather in ${city}: ${weatherDescription}`;
            }),
        );
    }
}
