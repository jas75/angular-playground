import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.test';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mapbox-card',
  templateUrl: './mapbox-card.component.html',
  styleUrls: ['./mapbox-card.component.scss']
})
export class MapboxCardComponent implements OnInit{

  map?: mapboxgl.Map;
  style = 'mapbox://styles/jas75/clgoxiivu00ht01r758ksf0zc';
  accessToken = environment.mapboxAccessToken;
  lat = 48.866667;
  lng = 2.333333;
  zoom = 5;
  public data: any;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get('/assets/data/communes.geojson').subscribe(data => {
      this.data = data;
      console.log(this.accessToken)
      this.map = new mapboxgl.Map({
        accessToken:
         this.accessToken,
        container: 'map',
        style: this.style,
        zoom: this.zoom,
        center: [this.lng, this.lat],
      });
  
      this.map.on('load', () => {
  
        // this.map?.addSource('countries', {
        //   type: 'geojson',
        //   data: 'https://www.data.gouv.fr/fr/datasets/r/00c0c560-3ad1-4a62-9a29-c34c98c3701e'
        // });
  
        // ts
        
        // this.map?.addSource('regions', {
        //   type: 'geojson',
        //   data: 'chemin/vers/le/fichier/regions.geojson'
        // });
    
        
          this.map?.addLayer({
            id: 'my-layer',
            type: 'fill',
            source: {
              type: 'geojson',
              data: this.data,
            },
            paint: {
              'fill-color': '#0080ff',
              'fill-opacity': 0.5,
            },
          });
        

          this.map?.addLayer({
            id: 'border-layer',
            type: 'line',
            source: {
              type: 'geojson',
              data: this.data
            },
            paint: {
              'line-color': '#ffffff',
              'line-width': 1
            }
          });
    })

    })
  }
}
