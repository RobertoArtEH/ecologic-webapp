import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { User } from '../models/user';

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
    const token = localStorage.getItem('token');
    
    return from(
      fetch(environment.BASE_URL + 'logout', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        method: 'GET'
      }
      )
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      })
      );
    }
    
  getUsers() {
    return this.httpClient.get(environment.BASE_URL + 'users');
  }

  switchStatus(data): any {
    return this.httpClient.put(environment.BASE_URL + 'status', data);
  }

}
