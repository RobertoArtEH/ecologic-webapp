import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Chart } from 'chart.js';
import { PlantService } from 'src/app/services/plant.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Sensor } from 'src/app/models/sensor';
import { Waterlog } from 'src/app/models/waterlog';
import Ws from '@adonisjs/websocket-client';
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Ws
  ws: any;
  water: any;
  values: number[] = [];

  form: FormGroup;
  lightChart: [];
  humidityChart: [];
  sensorsLog: Array<Sensor> = [];
  waterLog: Waterlog;
  sensor: Sensor = {
    fecha: undefined,
    humedadPlanta: undefined,
    ldr: undefined
  };

  constructor(
    private elementRef: ElementRef, 
    private fb: FormBuilder,
    private plantService: PlantService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    // Ws
    this.ws = Ws('ws://localhost:3333');

    this.ws.connect();
    this.water = this.ws.subscribe('waterplant');

    this.water.on('value', (data: any) => {
      this.values.push(data);
    });

    // Range time
    this.form = this.fb.group({
      time: [10, [Validators.required, Validators.pattern("^[0-9]*$")]],
    });

    //Firebase
    this.firebaseService.sensors().subscribe(response => {
      this.sensor = Object.values(response)[0];

      this.initLightChart();
    });

    this.firebaseService.lastSensors().subscribe(response => {
      for (const key in response) {
        var i = Object.keys(response).indexOf(key);
        this.sensorsLog.push(Object.values(response)[i]);
      }

      this.initHumidityChart();
    });

  }

  waterPlant(option) {
    if(option == 'adafruit') {
      if(!this.form.invalid) {
        this.plantService.water(this.form.get('time').value).subscribe(response => {
          this.firebaseService.registerWater(this.sensor.humedadPlanta).subscribe();
  
          Swal.fire({
            icon: 'success',
            title: 'Regando',
            text: response.message,
            showConfirmButton: false,
            timer: 2300
          });
        }, 
        () => {
          Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error.',
            text: 'Intentalo más tarde...',
            showConfirmButton: false,
            timer: 2300
          });
        });
      }
    } else { // Ws
      const time = this.form.get('time').value;

      this.water.emit('water', time);
      this.values.push(time);
      
      Swal.fire({
        icon: 'success',
        title: 'Regando',
        text: `La planta se empezará a regar en breve, por un tiempo de ${time} segundos.`,
        showConfirmButton: false,
        timer: 3500
      });
    }
  }

  initLightChart() {
    const lightChart = this.elementRef.nativeElement.querySelector(`#lightChart`);

    this.lightChart = new Chart(lightChart, {
      type: 'doughnut',
      data: {
        labels: ['Nivel de luz (LDR)', 'Restante'],
        datasets: [
          {
            data: [this.sensor.ldr, (100 - this.sensor.ldr)],
            backgroundColor: ['#4e73df', '#1cc88a'],
            hoverBackgroundColor: ['#2e59d9', '#17a673'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false
        },
        cutoutPercentage: 80,
      }
    });
  }

  initHumidityChart() {
    const humidityChart = this.elementRef.nativeElement.querySelector(`#humidityChart`);

    this.humidityChart = new Chart(humidityChart, {
      type: 'line',
      data: {
        labels: this.sensorsLog.map(log => {
          return log.fecha.substr(12, 5);
        }),
        datasets: [{
          label: "Humedad",
          lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          data: this.sensorsLog.map(log => log.humedadPlanta),
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              callback: function(value, index, values) {
                return value;
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
        }
      }
    });
  }

}
