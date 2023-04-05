import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeafletCardComponent } from './components/leaflet-card/leaflet-card.component';

const routes: Routes = [
  {
    path: 'leaflet',
    component: LeafletCardComponent
  },

  {
    path: '**',
    redirectTo: 'leaflet'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
