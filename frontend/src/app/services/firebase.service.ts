import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private httpClient: HttpClient) { }

  registerWater() {
    const data2 = {
      fecha: '16-04-2020',
      hora: '12:30',
      humedad: 25,
      miembro: 'Luis Esqueda'
    }

    return this.httpClient.post(environment.BASE_URL + 'waterlog/register', data2);
  }

  waterLog() {
    return this.httpClient.get(environment.BASE_URL + 'waterlog');
  }
}
