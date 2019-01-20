import { Component, OnInit } from '@angular/core';
import { APP_REDUCERS } from '../_store/app-reducers';
import { FEATURE } from '../_store/features';
import { Store } from '@ngrx/store';
import { APP_ACTIONS } from '../_store/app-actions';
import { NgrxStoreSubscription } from 'ngrx-helpers';
import { Chart, Highcharts } from 'angular-highcharts';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent extends NgrxStoreSubscription implements OnInit {
  dataState: any;
  ans: any;
  correct: number;
  incorrect: number;
  total: number;
  data: any;
  constructor(private store: Store<any>) {
    super(store)
  }
  pie: any;



  ngOnInit() {
    super.getState({
      feature: FEATURE.APP,
      reducer: APP_REDUCERS.APP_DATA,
      state: 'ansData'
      }).subscribe((data) => {
      this.dataState = data.state;
      if (data.state == 'RESOLVED') {
        this.ans = data.data.ans;
        this.correct = data.data.correctAns;
        this.total = data.data.totalAns;
        this.incorrect = (data.data.totalAns - data.data.correctAns);
        this.getPie(); 
        console.log(this.pie);
      }
    });

    super.getState({
      feature: FEATURE.APP,
      reducer: APP_REDUCERS.APP_DATA,
      state: 'appData'
    }).subscribe((data) => {
      this.dataState = data.state;
      if (data.state == 'RESOLVED') {
        this.data = data.data;
      }
    });


  }
  getPie() {
     //chart 
     
    Highcharts.setOptions({colors: ['darkgreen','red']});
     this.pie = new Chart({
      chart: {
        plotBackgroundColor: 'transparent',
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Result'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage} %',
            style: {
              color: 'black'
            }
          }
        }
      },
      series: [{
        name: 'Brands',
        data: [{
          name: 'Correct Answer',
          y: this.correct/this.total*100,
          sliced: true,
          selected: true
        }, {
          name: 'Incorrect Answer',
          y: this.incorrect/this.total*100
        }]
      }]
    });

  }
}
