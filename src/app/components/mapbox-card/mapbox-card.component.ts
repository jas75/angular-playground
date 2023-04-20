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

      // this.map?.addSource('countries', {
      //   type: 'geojson',
      //   data: 'https://www.data.gouv.fr/fr/datasets/r/00c0c560-3ad1-4a62-9a29-c34c98c3701e'
      // });

      this.map?.addSource('communes', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions/ile-de-france/communes-ile-de-france.geojson'
      });
      
      // this.map?.addSource('regions', {
      //   type: 'geojson',
      //   data: 'chemin/vers/le/fichier/regions.geojson'
      // });
  
      this.map?.addLayer({
        'id': 'communes-layer',
        'type': 'fill',
        'source': 'communes',
        'layout': {},
        'paint': {
          'fill-color': [
            'match',
            ['get', 'nom_comm'],
            'Paris', 'red',
            'Bobigny', '#0074D9',
            'Montfermeil', '#2ECC40',
            /* ajouter autant de communes que nécessaire */
            /* 'nom_comm' est le nom de la propriété contenant le nom de la commune */
            /* '#XXXXXX' est le code hexadécimal de la couleur souhaitée pour cette commune */
            '#CCCCCC' /* couleur par défaut si le nom de la commune n'est pas trouvé */
          ],
          'fill-opacity': 0.8
        }
      });

    })
  }
}
