import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GoogleMap} from '@angular/google-maps';
import {ActivatedRoute} from '@angular/router';
import {environment} from 'environment';

@Component({
  selector: 'trip-viewer-map',
  templateUrl: './trip-viewer.component.html',
  styleUrls: ['./trip-viewer.component.css'],
  standalone: false
})
export class TripViewerComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, {static: false}) map!: GoogleMap;

  startLocation = '';
  destination = '';
  distance = '';
  busPlateNo = '';
  driverName = '';
  tripType = '';
  studentStatus = '';

  schoolLocation: google.maps.LatLngLiteral = {lat: -1.286389, lng: 36.817223};
  busLocation: google.maps.LatLngLiteral = {lat: -1.286389, lng: 36.817223};
  homeLocation: google.maps.LatLngLiteral = {lat: -1.286389, lng: 36.817223};

  eta: string = 'Calculating...';
  loading: boolean = true;
  error: string = '';
  directionsRenderer: google.maps.DirectionsRenderer | null = null;
  private terminalId: string | null = null;
  private updateInterval: any;

  center: google.maps.LatLngLiteral = {lat: -1.286389, lng: 36.817223};
  zoom = 14;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
  };

  schoolMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '/assets/images/profile/school_8074788.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  };
  busMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '/assets/images/profile/school-bus_6767283.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  };
  homeMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '/assets/images/profile/home_738873.png',
      scaledSize: new google.maps.Size(40, 40)
    }
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadStudentTripData(id);
    }
    this.updateInterval = setInterval(() => {
      this.refreshBusLocation();
    }, 10000);
  }

  private loadStudentTripData(studentTripId: string): void {
    this.http.get<any>(`${environment.apiUrl}student-trips/${studentTripId}`).subscribe({
      next: (st) => {
        const student = st.student || {};
        const fleet = student.fleet || {};
        const terminal = fleet.terminal || {};
        const school = fleet.school || {};

        this.tripType = st.trip?.tripType || '';
        this.studentStatus = st.status || '';

        // Home location
        if (student.latitude && student.longitude) {
          this.homeLocation = {lat: Number(student.latitude), lng: Number(student.longitude)};
          this.center = this.homeLocation;
        }

        // School location
        if (school.latitude && school.longitude) {
          this.schoolLocation = {lat: Number(school.latitude), lng: Number(school.longitude)};
        }
        this.startLocation = school.name || 'School';

        // Bus location from terminal GPS
        if (terminal.latitude && terminal.longitude) {
          this.busLocation = {lat: Number(terminal.latitude), lng: Number(terminal.longitude)};
        }

        // Number plate from fleet
        this.busPlateNo = fleet.numberPlate || '';

        // Store terminal ID for periodic refresh
        if (terminal.id) {
          this.terminalId = String(terminal.id);
        }

        // Driver name via fleet
        if (fleet.id) {
          this.http.get<any>(`${environment.apiUrl}drivers?fleetId.equals=${fleet.id}&size=1`).subscribe(drivers => {
            if (drivers?.length > 0) {
              this.driverName = drivers[0].name || '';
            }
          });
        }

        this.calculateRouteAndETA();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load trip data';
        this.loading = false;
      }
    });
  }

  private refreshBusLocation(): void {
    if (!this.terminalId) return;
    this.http.get<any>(`${environment.apiUrl}terminals/${this.terminalId}`).subscribe({
      next: (terminal) => {
        if (terminal.latitude && terminal.longitude) {
          this.busLocation = {lat: Number(terminal.latitude), lng: Number(terminal.longitude)};
          this.calculateRouteAndETA();
        }
      }
    });
  }

  private getRouteDestination(): google.maps.LatLngLiteral {
    if (this.studentStatus === 'BOARDED' && this.tripType === 'PICKUP') {
      return this.schoolLocation;
    }
    return this.homeLocation;
  }

  private async calculateRouteAndETA(): Promise<void> {
    return new Promise((resolve) => {
      const directionsService = new google.maps.DirectionsService();
      const request: google.maps.DirectionsRequest = {
        origin: this.busLocation,
        destination: this.getRouteDestination(),
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, (response, status) => {
        if (status === 'OK' && response) {
          if (this.directionsRenderer) {
            this.directionsRenderer.setDirections(response);
            const route = response.routes[0];
            if (route?.legs[0]) {
              this.eta = route.legs[0].duration?.text || 'Calculating...';
              this.distance = route.legs[0].distance?.text || '';
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
