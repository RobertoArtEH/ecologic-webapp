import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private httpClient: HttpClient) { }

  sensors() {
    return this.httpClient.get(environment.BASE_URL + 'sensors');
  }

  lastSensors() {
    return this.httpClient.get(environment.BASE_URL + 'sensors/last');
  }

  registerWater(humidity: number) {
    const nDate = new Date();

    const day = nDate.getDate();
    const month = nDate.getMonth() + 1;
    const year = nDate.getFullYear();

    const hour = (nDate.getHours() < 10) ? '0' + nDate.getHours() : nDate.getHours();
    const minutes = (nDate.getMinutes() < 10) ? '0' + nDate.getMinutes() : nDate.getMinutes();

    const date = (month < 10) ? `${day}-0${month}-${year}` : `${day}-${month}-${year}`;
    const time = `${hour}:${minutes}`;

    const data = {
      fecha: date,
      hora: time,
      humedad: humidity
    };

    return this.httpClient.post(environment.BASE_URL + 'waterlog/register', data);
  }

  waterLog() {
    return this.httpClient.get(environment.BASE_URL + 'waterlog');
  }

  lastWaterLog() {
    return this.httpClient.get(environment.BASE_URL + 'waterlog/last');
  }

}
