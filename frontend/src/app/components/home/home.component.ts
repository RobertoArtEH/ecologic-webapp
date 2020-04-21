import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Sensor } from 'src/app/models/sensor';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  sensor: Sensor = {
    humedad: undefined,
    temperatura: undefined
  };

  constructor(
    private userService: UserService,
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.firebaseService.sensors().subscribe(response => {
      this.sensor = Object.values(response)[0];
    });
  }

  logout() {
    this.userService.logout().subscribe(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      this.router.navigate(['login']);
    });
  }

}
