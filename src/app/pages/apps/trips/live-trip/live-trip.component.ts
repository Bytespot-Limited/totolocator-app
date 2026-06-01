import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMap } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environment';

@Component({
  selector: 'app-live-trip',
  templateUrl: './live-trip.component.html',
  styleUrls: ['./live-trip.component.css'],
  standalone: false
})
export class LiveTripComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  studentName = '';
  driverName = '';
  busPlateNo = '';
  schoolName = '';
  tripType = '';
  eta = 'Calculating...';
  distance = '';
  startLocation = '';

  tripEnded = false;
  loading = true;
  error = '';

  schoolLocation: google.maps.LatLngLiteral = { lat: -1.286389, lng: 36.817223 };
  busLocation: google.maps.LatLngLiteral = { lat: -1.286389, lng: 36.817223 };
  homeLocation: google.maps.LatLngLiteral = { lat: -1.286389, lng: 36.817223 };

  center: google.maps.LatLngLiteral = { lat: -1.286389, lng: 36.817223 };
  zoom = 14;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
  };

  schoolMarkerOptions: google.maps.MarkerOptions = {
    icon: { url: '/assets/images/profile/school_8074788.png', scaledSize: new google.maps.Size(40, 40) }
  };
  busMarkerOptions: google.maps.MarkerOptions = {
    icon: { url: '/assets/images/profile/school-bus_6767283.png', scaledSize: new google.maps.Size(40, 40) }
  };
  homeMarkerOptions: google.maps.MarkerOptions = {
    icon: { url: '/assets/images/profile/home_738873.png', scaledSize: new google.maps.Size(40, 40) }
  };

  directionsRenderer: google.maps.DirectionsRenderer | null = null;
  private studentTripId: string | null = null;
  private updateInterval: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.studentTripId = this.route.snapshot.paramMap.get('id');
    if (this.studentTripId) {
      this.loadTripData(this.studentTripId);
      this.updateInterval = setInterval(() => this.refreshLocation(), 10000);
    }
  }

  private loadTripData(id: string): void {
    this.http.get<any>(`${environment.apiUrl}public/trip-view/${id}`).subscribe({
      next: (data) => {
        if (data.tripStatus === 'COMPLETED') {
          this.tripEnded = true;
          this.loading = false;
          this.stopPolling();
          return;
        }

        this.studentName = data.studentName || '';
        this.driverName = data.driverName || '';
        this.busPlateNo = data.vehiclePlate || '';
        this.schoolName = data.schoolName || '';
        this.tripType = data.tripType || '';
        this.startLocation = data.schoolName || 'School';

        if (data.schoolLat && data.schoolLng) {
          this.schoolLocation = { lat: Number(data.schoolLat), lng: Number(data.schoolLng) };
        }
        if (data.homeLat && data.homeLng) {
          this.homeLocation = { lat: Number(data.homeLat), lng: Number(data.homeLng) };
          this.center = this.homeLocation;
        }
        if (data.terminalLat && data.terminalLng) {
          this.busLocation = { lat: Number(data.terminalLat), lng: Number(data.terminalLng) };
        }

        this.calculateRouteAndETA();
        this.loading = false;
      },
      error: (err) => {
        if (err.status === 403) {
          this.tripEnded = true;
          this.stopPolling();
        } else {
          this.error = 'Failed to load trip data.';
        }
        this.loading = false;
      }
    });
  }

  private refreshLocation(): void {
    if (!this.studentTripId) return;
    this.http.get<any>(`${environment.apiUrl}public/trip-location/${this.studentTripId}`).subscribe({
      next: (data) => {
        if (data.tripStatus === 'COMPLETED') {
          this.tripEnded = true;
          this.stopPolling();
          return;
        }
        if (data.terminalLat && data.terminalLng) {
          this.busLocation = { lat: Number(data.terminalLat), lng: Number(data.terminalLng) };
          this.calculateRouteAndETA();
        }
      }
    });
  }

  private stopPolling(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  private getRouteDestination(): google.maps.LatLngLiteral {
    return this.tripType === 'PICKUP' ? this.schoolLocation : this.homeLocation;
  }

  private async calculateRouteAndETA(): Promise<void> {
    return new Promise((resolve) => {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route({
        origin: this.busLocation,
        destination: this.getRouteDestination(),
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if (status === 'OK' && response && this.directionsRenderer) {
          this.directionsRenderer.setDirections(response);
          const leg = response.routes[0]?.legs[0];
          if (leg) {
            this.eta = leg.duration?.text || 'Calculating...';
            this.distance = leg.distance?.text || '';
          }
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

  goToLogin(): void {
    this.router.navigate(['/authentication/login']);
  }

  ngOnDestroy(): void {
    this.stopPolling();
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
    }
  }
}
