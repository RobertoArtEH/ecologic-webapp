import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private httpClient: HttpClient) { }

  test() {
    const data = {
      member: 'Roberto Esqueda', 
      humidity: 27, 
      date: '17-04-2020', 
      time: '10:30'
    }

    return this.httpClient.post(environment.BASE_URL + 'test', data);
  }

  waterLog() {
    return this.httpClient.get(environment.BASE_URL + 'waterlog');
  }
}
