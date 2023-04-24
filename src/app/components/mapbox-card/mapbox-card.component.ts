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
    
        
          // this.map?.addLayer({
          //   id: 'my-layer',
          //   type: 'fill',
          //   source: {
          //     type: 'geojson',
          //     data: this.data,
          //   },
          //   paint: {
          //     'fill-color': 'transparent',
          //     'fill-opacity': 0.5,
          //   },
          // });
        

          // this.map?.addLayer({
          //   id: 'border-layer',
          //   type: 'line',
          //   source: {
          //     type: 'geojson',
          //     data: this.data
          //   },
          //   paint: {
          //     'line-color': '#ffffff',
          //     'line-width': 1
          //   }
          // });

          this.map?.addLayer({
            id: 'region-layer',
            type: 'fill',
            source: {
              type: 'geojson',
              data: this.data
            },
            paint: {
              'fill-color': [
                'match',
                ['get', 'region'],
                'Occitanie', '#FF0000',
                'Provence-Alpes-Côte d\'Azur', '#00FF00',
                'Île-de-France', '#0000FF',
                'Hauts-de-France', '#FFFF00',
                'Nouvelle-Aquitaine', '#FF00FF',
                'Auvergne-Rhône-Alpes', '#00FFFF',
                'Bretagne', '#800080 ',
                'Centre-Val de Loire', '#FFA500',
                'Pays de la Loire', '#008000',
                'Bourgogne-Franche-Comté', '#800000',
                'Grand Est', '#000080',
                'Normandie', '#008080',
                /* Ajoutez d'autres couleurs pour chaque région */
                '#000000' /* Couleur par défaut */
              ],
              "fill-opacity": 0.5
            }
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
              'line-width': 0.2
            }
          });
      });

    })
  }
}
