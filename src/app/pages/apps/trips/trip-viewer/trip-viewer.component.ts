// map.component.ts
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GoogleMap} from '@angular/google-maps';

@Component({
  selector: 'trip-viewer-map',
  templateUrl: './trip-viewer.component.html',
  styleUrls: ['./trip-viewer.component.css'],
  standalone: false
})
export class TripViewerComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, {static: false}) map!: GoogleMap;

  // map.component.ts
  startLocation = 'Andaa School';
  destination = 'Lily\'s home';
  distance = '8.5 km';
  busPlateNo = 'KDD 188P';
  driverName = 'John Doe';


  busLocation: google.maps.LatLngLiteral = {lat: -1.2316069, lng: 36.6672981};
  homeLocation: google.maps.LatLngLiteral = {
    lat: -1.2402458,
    lng: 36.6924413
  };
  eta: string = 'Calculating...';
  loading: boolean = true;
  error: string = '';
  directionsRenderer: google.maps.DirectionsRenderer | null = null;
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
      scaledSize: new google.maps.Size(20, 20)
    },
    //label: this.busPlateNo
  };

  homeMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: 'https://maps.gstatic.com/mapfiles/ms2/micons/homegardenbusiness.png',
      scaledSize: new google.maps.Size(20, 20)
    },
    //label: 'Home'
  };

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.updateLocationAndETA();
    this.updateInterval = setInterval(() => {
      this.updateLocationAndETA();
    }, 10000);
  }

  async updateLocationAndETA(): Promise<void> {
    try {
      //const busData = await this.http.get<any>('/api/bus-location').toPromise();
      const busData = {lat: -1.2316069, lng: 36.6672981};

      this.busLocation = busData;
      await this.calculateRouteAndETA();
      this.loading = false;
    } catch (err) {
      this.error = 'Failed to update location';
      this.loading = false;
    }
  }

  private async calculateRouteAndETA(): Promise<void> {
    return new Promise((resolve) => {
      const directionsService = new google.maps.DirectionsService();

      const request: google.maps.DirectionsRequest = {
        origin: this.busLocation,
        destination: this.homeLocation,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, (response, status) => {
        if (status === 'OK' && response) {
          if (this.directionsRenderer) {
            this.directionsRenderer.setDirections(response);
            const route = response.routes[0];
            if (route && route.legs[0]) {
              this.eta = route.legs[0].duration?.text || 'Calculating...';
            }
          }
        } else {
          this.error = 'Failed to calculate route';
        }
        resolve();
      });
    });
  }

  onMapReady(map: google.maps.Map): void {
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(map);
    }
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    }
  }
}
