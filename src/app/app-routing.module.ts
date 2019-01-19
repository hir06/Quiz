import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
},
{
    path: 'report',
    component: ReportComponent,
},
{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
