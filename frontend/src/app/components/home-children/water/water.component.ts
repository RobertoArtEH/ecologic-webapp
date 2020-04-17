import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent implements OnInit {

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  sendData() {
    this.firebaseService.test().subscribe(response => {
      console.log(response);
    });
  }

  getData() {
    this.firebaseService.waterLog().subscribe(response => {
      console.log(response);
    });
  }
}
