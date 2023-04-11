import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeafletCardComponent } from './components/leaflet-card/leaflet-card.component';
import { MapboxCardComponent } from './components/mapbox-card/mapbox-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LeafletCardComponent,
    MapboxCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
