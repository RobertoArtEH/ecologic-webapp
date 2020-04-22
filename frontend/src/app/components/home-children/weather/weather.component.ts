import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  day;
  constructor(private weahterService: WeatherService) { }

  ngOnInit(): void {
    this.weahterService.nextDays().subscribe(arg => this.day = arg);
  }

}
