import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.test';

@Component({
  selector: 'app-mapbox-card',
  templateUrl: './mapbox-card.component.html',
  styleUrls: ['./mapbox-card.component.scss']
})
export class MapboxCardComponent implements OnInit{

  map?: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v12';
  accessToken = environment.mapboxAccessToken;
  lat = 26.3398;
  lng = -81.7787;

  ngOnInit(): void {
    console.log(this.accessToken)
    this.map = new mapboxgl.Map({
      accessToken:
       this.accessToken,
      container: 'map',
      style: this.style,
      zoom: 2,
      center: [this.lng, this.lat],
    });

    console.log(this.map)
  }
}
