import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.test';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-mapbox-card',
  templateUrl: './mapbox-card.component.html',
  styleUrls: ['./mapbox-card.component.scss']
})
export class MapboxCardComponent implements OnInit{

  public map?: mapboxgl.Map;
  public style = 'mapbox://styles/jas75/clgoxiivu00ht01r758ksf0zc';
  public accessToken = environment.mapboxAccessToken;
  public lat = 48.866667;
  public lng = 2.333333;
  public zoom = 5;
  public borders: any;
  public units: any;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadData().then(() => {
      this.createMap();
      this.map?.on('load', () => {
          this.addRegionsLayer();
          const marker = new mapboxgl.Marker({
            draggable: true
          })
          .setLngLat([this.lng, this.lat])
          .addTo(this.map as mapboxgl.Map)
      });

      // TODO bon je peux jouer avec le zoom, mais il faut voir quelle comportmeent je veux
      // this.map?.on('zoom', () => {
      //   const zoom = this.map?.getZoom();

      //   if (zoom as number > 15) {
      //     this.hideLayers();
      //   } else {
      //     this.displayRegionLayer();
      //   }
      // })

    })
  }

  public createMap() {
    this.map = new mapboxgl.Map({
      accessToken:
       this.accessToken,
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat],
    });
  }

  public addRegionsLayer() {
    this.map?.addLayer({
      id: 'region-layer',
      type: 'fill',
      source: {
        type: 'geojson',
        data: this.borders
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
        "fill-opacity": 0.3
      }
    });

    this.map?.addLayer({
      id: 'border-layer',
      type: 'line',
      source: {
        type: 'geojson',
        data: this.borders
      },
      paint: {
        'line-color': '#ffffff',
        'line-width': 0.2
      }
    });
  }

  public displayRegionLayer() {
    this.map?.setLayoutProperty('region-layer', 'visibility', 'visible');
    this.map?.setLayoutProperty('border-layer', 'visibility', 'visible');
  }
  public hideLayers() {
    this.map?.setLayoutProperty('region-layer', 'visibility', 'none'); // Cacher le layer
    this.map?.setLayoutProperty('border-layer', 'visibility', 'none');
  }


  // HTTP REQUESTS
  public loadData() {
    return Promise.all([
      this.getBorders(),
      this.getUnits()
    ])
  }

  public getBorders(): Promise<any> {
    return lastValueFrom(this.http.get('/assets/data/regions-fr.geojson'))
    .then((res: any) => {
      this.borders = res;
      return Promise.resolve()
    })
    .catch((err: any) => Promise.reject());
  }

  public getUnits(): Promise<any> {
    return lastValueFrom(this.http.get('/assets/data/units.geojson'))
    .then((res: any) => {
      this.units = res
      return Promise.resolve()
    })
    .catch((err: any) => Promise.reject());
  }

}
