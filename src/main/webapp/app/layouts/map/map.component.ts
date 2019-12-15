import { Component, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { HostListener } from '@angular/core';
import * as MapDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  map: mapboxgl.Map;
  directions: MapDirections;
  style = 'mapbox://styles/mathpapi/ck3jdqr902qkl1dpgj4h2n58q';
  lat = 38.7368;
  lng = -9.1387;

  environment = {
    mapbox: {
      accessToken: 'pk.eyJ1IjoibWF0aHBhcGkiLCJhIjoiY2szamJiY3doMDBhcTNkbXVxdnNqemZjcCJ9.RrCqkxei5wJP5_4ullKcWQ'
    }
  };
  constructor() {}

  @HostListener('window:resize', ['$event'])
  public onResize(event): void {
    this.map.resize();
    this.map.triggerRepaint();
  }

  ngAfterViewInit(): void {
    this.directions = new MapDirections({
      accessToken: 'pk.eyJ1IjoibWF0aHBhcGkiLCJhIjoiY2szamJiY3doMDBhcTNkbXVxdnNqemZjcCJ9.RrCqkxei5wJP5_4ullKcWQ',
      unit: 'metric',
      profile: 'mapbox/cycling',
      controls: {
        inputs: true,
        instructions: true
      }
    });
    this.directions.setOrigin([this.lng, this.lat]);
    (mapboxgl as any).accessToken = this.environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 16,
      center: [this.lng, this.lat],
      interactive: true
    });
    // Add map controls
    this.map.addControl(this.directions, 'top-left');
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.triggerRepaint();
  }
}
