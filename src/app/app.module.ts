import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
// import { ChartModule } from 'angular-highcharts';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {NgrxHelperModule} from 'ngrx-helpers';
import {rootReducers, metaReducers} from './_store/meta-reducers';
import {FEATURE} from './_store/features';
import {appReducers} from './_store/app-reducers';
import {appEffects} from './_store/app-effects';
import {HttpClientModule} from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {environment} from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducers, { metaReducers }),
    StoreModule.forFeature(FEATURE.APP, appReducers),
    EffectsModule.forRoot(appEffects),
    NgrxHelperModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store DevTools',
      logOnly: environment.production,
    }),
    // ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
