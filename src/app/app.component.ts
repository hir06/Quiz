import { Component, OnInit } from '@angular/core';
import {APP_REDUCERS} from './_store/app-reducers';
import {FEATURE} from './_store/features';
import { Store } from '@ngrx/store';
import {APP_ACTIONS} from './_store/app-actions';
import {RootComponent} from './root.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends RootComponent implements OnInit  {
  title = 'quiz';

  constructor(private store: Store<any>) {
    super();
  }

  ngOnInit() {
    this.store.dispatch({
      type: APP_ACTIONS.FETCH_DATA
    });
    super.subscribe({
      store: this.store,
      feature: FEATURE.APP,
      reducer: APP_REDUCERS.APP_DATA,
      state: 'appData'
    }, (data) => {
      console.log(data);
    });
  }
}
