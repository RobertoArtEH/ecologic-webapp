import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private httpClient: HttpClient) { }

  water(time): any {
    const data = { time };

    return this.httpClient.post(environment.BASE_URL + 'water', data);
  }
}
