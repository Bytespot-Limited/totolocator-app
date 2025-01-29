// map.component.ts
import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
    selector: 'app-order-tracking-map',
    templateUrl: './trip-viewer.component.html',
    styleUrls: ['./trip-viewer.component.css'],
    standalone: false
})
export class TripViewerComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  busLocation: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  homeLocation: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 1
  };
  eta: string = 'Calculating...';
  loading: boolean = true;
  error: string = '';
  private updateInterval: any;

  // Map configuration
  center = this.homeLocation;
  zoom = 14;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
  };

  // Marker options
  busMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: 'https://maps.gstatic.com/mapfiles/ms2/micons/bus.png',
      scaledSize: new google.maps.Size(40, 40)
    },
    label: 'School Bus'
  };

  homeMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: 'https://maps.gstatic.com/mapfiles/ms2/micons/homegardenbusiness.png',
      scaledSize: new google.maps.Size(40, 40)
    },
    label: 'Home'
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.updateLocationAndETA();
    this.updateInterval = setInterval(() => {
      this.updateLocationAndETA();
    }, 10000);
  }

  async updateLocationAndETA(): Promise<void> {
    try {
      const busData = await this.http.get<any>('/api/bus-location').toPromise();
      this.busLocation = busData.location;
      this.calculateETA();
      this.loading = false;
    } catch (err) {
      this.error = 'Failed to update location';
      this.loading = false;
    }
  }

  protected calculateETA(): void {
    if (!this.map?.googleMap) return;

    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [this.busLocation],
      destinations: [this.homeLocation],
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === 'OK' && response) {
        this.eta = response.rows[0].elements[0].duration?.text || 'Calculating...';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}
