// map.component.ts
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GoogleMap} from '@angular/google-maps';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../../../environment";

@Component({
  selector: 'trip-viewer-map',
  templateUrl: './trip-viewer.component.html',
  styleUrls: ['./trip-viewer.component.css'],
  standalone: false
})
export class TripViewerComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, {static: false}) map!: GoogleMap;

  // student-trip ID
  id: any;
  // terminal ID
  terminalId: any;
  // direction of travel i.e to home or to school
  tripType: 'PICKUP';

  // HTTP headers
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })


  // map.component.ts
  startLocation = 'Loading ...';
  destination = 'Loading ...';
  distance = 'Loading ...';
  busPlateNo = 'Loading ...';
  driverName = 'John Doe';


  schoolLocation: google.maps.LatLngLiteral = {lat: -1.2316069, lng: 36.6672981};
  busLocation: google.maps.LatLngLiteral = {lat: -1.2295427532464205, lng: 36.681729255778706};
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
  schoolMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '/assets/images/profile/school_8074788.png',
      scaledSize: new google.maps.Size(40, 40)
    },
    //label: this.busPlateNo
  };
  busMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '/assets/images/profile/school-bus_6767283.png',
      scaledSize: new google.maps.Size(40, 40)
    },
    //label: this.busPlateNo
  };

  homeMarkerOptions: google.maps.MarkerOptions = {
    icon: {
      url: '/assets/images/profile/home_738873.png',
      scaledSize: new google.maps.Size(40, 40)
    },
    //label: 'Home'
  };

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    // Fetch the student ID from the route
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');  // Use '+' to convert the parameter to a number if needed
      console.log('Received ID:', this.id);
    });

    // Fetch the student trip
    this.getStudentTrip(this.id)


    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.updateLocationAndETA();


    this.updateInterval = setInterval(() => {
      this.updateLocationAndETA();
    }, 20000);
  }

  // Get students on the given trip
  getStudentTrip(tripId: number) {
    this.http.get(environment.apiUrl.concat("student-trips/" + tripId),
      {headers: this.headers})
    .subscribe((res: any) => {
      this.homeLocation = {
        lat: +res.student.latitude,
        lng: +res.student.longitude
      };

      this.busLocation = {
        lat: +res.student.fleet.terminal.latitude,
        lng: +res.student.fleet.terminal.longitude
      };

      this.schoolLocation = {
        lat: +res.student.fleet.school.latitude,
        lng: +res.student.fleet.school.longitude
      };

      this.startLocation = res.student.fleet.school.name;
      this.destination = res.student.name.concat('\'s home');
      this.busPlateNo = res.student.fleet.numberPlate;
      this.driverName = 'John Doe';
      this.terminalId = +res.student.fleet.terminal.id;
      this.tripType = res.trip.tripType;

      console.log("Getting students trip data: {}", res)
    })
  }


  async updateLocationAndETA(): Promise<void> {
    try {
      //const busData = await this.http.get<any>('/api/bus-location').toPromise();
      this.http.get(environment.apiUrl.concat("terminals/").concat(String(this.terminalId)),
        {headers: this.headers})
      .subscribe((res: any) => {
        const busData = {lat: +res.latitude, lng: +res.longitude};
        this.busLocation = busData;
        this.calculateRouteAndETA();
        this.loading = false;

      })

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
        destination: (this.tripType == 'PICKUP') ? this.schoolLocation : this.homeLocation,
        travelMode: google.maps.TravelMode.DRIVING
      };

      directionsService.route(request, (response, status) => {
        if (status === 'OK' && response) {
          if (this.directionsRenderer) {
            this.directionsRenderer.setDirections(response);
            const route = response.routes[0];

            if (route && route.legs[0]) {
              this.eta = route.legs[0].duration?.text || 'Calculating...';
              // Update Distance
              // route.legs[0].distance will have a .text (e.g., "8.5 km") and a .value (in meters)
              this.distance = route.legs[0].distance?.text || 'N/A';
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
