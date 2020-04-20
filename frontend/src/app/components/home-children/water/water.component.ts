import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-water',
  templateUrl: './water.component.html',
  styleUrls: ['./water.component.scss']
})
export class WaterComponent implements OnInit {
  riegos = [];
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.waterLog().subscribe(response => {
      for(const key in response) {
        var i = Object.keys(response).indexOf(key);
        this.riegos.push(Object.values(response)[i]);
      }
    });
  }
}
