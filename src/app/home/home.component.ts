import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {APP_REDUCERS} from '../_store/app-reducers';
import {FEATURE} from '../_store/features';
import { Store } from '@ngrx/store';
import {APP_ACTIONS} from '../_store/app-actions';
import { NgrxStoreSubscription } from 'ngrx-helpers';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends NgrxStoreSubscription implements OnInit {
  data: any = [];
  activeQue = 0;
  dataState: string;
  correctAns = 0;
  opt = ['A','B','C','D','E','F','G','H','I'];
  ans =[];
  @ViewChild('test') test: ElementRef; 


  constructor(private store: Store<any>) {
    super(store);
   }

  ngOnInit() {
        // Fetching data from the API for questions
        this.store.dispatch({
          type: APP_ACTIONS.FETCH_DATA
        });
        
        super.getState({
          feature: FEATURE.APP,
          reducer: APP_REDUCERS.APP_DATA,
          state: 'appData'
          }).subscribe((data) => {
            this.dataState = data.state;
            if(data.state == 'RESOLVED'){
              this.data = data.data;
            }
          });

  }

  saveAns(num) {
    this.activeQue ++;
    this.ans.push(num + 1);
    if(num === this.data[this.activeQue -1].answer) {
      this.correctAns ++;
    }
    if(this.activeQue === this.data.length) {
      console.log('inside here');
      this.store.dispatch({
        type: APP_ACTIONS.FETCH_ANS_RESOLVED,
        data: {
          ans: this.ans,
          correctAns: this.correctAns,
          totalAns: this.data.length
        }
      });
    }
  }

}
