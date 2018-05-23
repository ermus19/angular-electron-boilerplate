import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NetworkGraphComponent } from './network-graph/network-graph.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'graph', component: NetworkGraphComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
