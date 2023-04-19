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
  style = 'mapbox://styles/jas75/clgcdohmm001z01p2szlmyy6x';
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

    this.map.on('load', () => {

      this.map?.addSource('countries', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
      });
  
      this.map?.addLayer({
        'id': 'countries',
        'type': 'fill',
        'source': 'countries',
        'layout': {},
        'paint': {
          'fill-color': 'red',
          'fill-opacity': 0.5
        }
      });
    })
  }
}
