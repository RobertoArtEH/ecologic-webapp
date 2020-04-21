import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  register(data) {
    return this.httpClient.post(environment.BASE_URL + 'register', data);
  }

  login(data): any {
    return this.httpClient.post(environment.BASE_URL + 'login', data);
  }
  
  logout() {
    return this.httpClient.get(environment.BASE_URL + 'logout');
  }
    
  getUsers() {
    return this.httpClient.get(environment.BASE_URL + 'users');
  }

  switchStatus(data): any {
    return this.httpClient.put(environment.BASE_URL + 'status', data);
  }

}
