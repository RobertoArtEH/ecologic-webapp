import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  day;
  urlBrokenClouds = "";
  constructor(private weahterService: WeatherService) { }

  ngOnInit(): void {
    this.weahterService.nextDays().subscribe(arg => {
      this.day = arg;
    });
  }
  getBadge(description) {
    switch (description) {
      case "broken clouds":
        return "#2ECC71";
      break;
      case "clear sky":
        return "#2874A6";
      break;
      case "light rain":
        return "#F1C40F";
      break;
      case "scattered clouds":
        return '#34495E';
      break;
      default:
        break;
    }
  }
  getBackground(description) {
    switch (description) {
      case "broken clouds":
        return 'https://live.staticflickr.com/1828/28636482297_bd428f26e8_b.jpg';
      break;
      case "clear sky":
        return 'https://www.publicdomainpictures.net/pictures/90000/nahled/clear-blue-sky-landscape.jpg';
      break;
      case "light rain":
        return 'https://p7.hiclipart.com/preview/810/1006/528/peshawar-light-rain-drop-precipitation-rain.jpg';
      break;
      case "scattered clouds":
        return 'https://c1.staticflickr.com/3/2106/1909487867_de140c7eb8_b.jpg';
      break;
      default:
        break;
    }
  }

}
