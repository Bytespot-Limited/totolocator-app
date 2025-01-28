import { Component, AfterViewInit } from '@angular/core';

declare var google: any; // To use the Google Maps API types

@Component({
  selector: 'app-order-tracking-map',
  template: `
    <div id="map" style="height: 100%; width: 100%;"></div>
  `,
  styles: [
    `
      #map {
        height: 100vh;
        width: 100%;
      }
    `,
  ]
})
export class TripViewerComponent implements AfterViewInit {
  private map!: google.maps.Map;
  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const mapOptions = {
      center: { lat: 40.7128, lng: -74.006 }, // Default location (New York City)
      zoom: 12,
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);

    // Example origin and destination
    const origin = { lat: 40.73061, lng: -73.935242 }; // Example starting point
    const destination = { lat: 40.712776, lng: -74.005974 }; // Example destination

    this.calculateAndDisplayRoute(origin, destination);
    this.getDistanceMatrix(origin, destination);
  }

  private calculateAndDisplayRoute(origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral): void {
    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (response: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
      if (status === google.maps.DirectionsStatus.OK && response) {
        this.directionsRenderer.setDirections(response);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  }


  private getDistanceMatrix(origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral): void {
    const distanceMatrixService = new google.maps.DistanceMatrixService();

    distanceMatrixService.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response: google.maps.DistanceMatrixResponse, status: google.maps.DistanceMatrixStatus) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          const result = response.rows[0].elements[0];
          console.log('Distance:', result.distance.text);
          console.log('Duration:', result.duration.text);
        } else {
          console.error('Distance Matrix request failed due to ' + status);
        }
      }
    );
  }
}











// /// <reference types="google.maps" />
// import {AfterViewInit, Component, OnInit} from '@angular/core';
// import {ActivatedRoute} from "@angular/router";
// import {HttpClient} from "@angular/common/http";
// import {environment} from "../../../../../../environment";
// import {MatCardModule} from "@angular/material/card";
// import {MatFormFieldModule} from "@angular/material/form-field";
// import {MatInputModule} from "@angular/material/input";
// import {MatTabsModule} from "@angular/material/tabs";
//
// interface RouteData {
//   origin: string;
//   destination: string;
//   distance?: string;
//   duration?: string;
//   path?: google.maps.LatLng[];
//   bounds?: google.maps.LatLngBounds; // Add bounds property
// }
//
//
// @Component({
//   selector: 'app-trip-viewer',
//   standalone: true,
//   imports: [
//
//
//
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatTabsModule
//   ],
//   templateUrl: './trip-viewer.component.html'
// })
// export class TripViewerComponent implements AfterViewInit, OnInit {
//   studentTripId: any;
//   studentTripData: any;
//
//   apiKey: string = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key
//   origin: string = 'New York, NY';
//   destination: string = 'Los Angeles, CA';
//   map!: google.maps.Map;
//   directionsService!: google.maps.DirectionsService;
//   directionsRenderer!: google.maps.DirectionsRenderer;
//   declare google: any; // Optional fallback if TypeScript doesn't detect `google`
//
//
//   ngAfterViewInit(): void {
//     if (window.google && google.maps) {
//       this.initMap();
//     } else {
//       console.error('Google Maps script not loaded.');
//     }
//
//     this.initMap();
//     this.plotRoute();
//   }
//
//   initMap(): void {
//     const mapOptions: google.maps.MapOptions = {
//       zoom: 7,
//       center: {lat: 39.8283, lng: -98.5795}, // Center of the US
//     };
//     this.map = new google.maps.Map(
//       document.getElementById('map') as HTMLElement,
//       mapOptions
//     );
//     this.directionsRenderer = new google.maps.DirectionsRenderer();
//     this.directionsRenderer.setMap(this.map);
//     this.directionsService = new google.maps.DirectionsService();
//   }
//
//   plotRoute(): void {
//     const request: google.maps.DirectionsRequest = {
//       origin: this.origin,
//       destination: this.destination,
//       travelMode: google.maps.TravelMode.DRIVING,
//     };
//
//     this.directionsService.route(request, (result, status) => {
//       if (status === google.maps.DirectionsStatus.OK && result) {
//         this.directionsRenderer.setDirections(result);
//       } else {
//         console.error('Failed to get directions:', status);
//       }
//     });
//   }
//
//   constructor(
//     private route: ActivatedRoute,
//     private http: HttpClient
//   ) {
//   }
//
//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       this.studentTripId = params.get('id');  // Use '+' to convert the parameter to a number if needed
//       console.log('Received student trip ID:', this.studentTripId);
//     });
//     this.fetchStudentTripInfo(this.studentTripId);
//   }
//
//   /**
//    * Fetch terminal information
//    * @param id
//    */
//   fetchStudentTripInfo(id: number) {
//     this.http.get(environment.apiUrl.concat("student-trips/" + id))
//     .subscribe((res: any) => {
//       console.log("Getting student  trip information: {}", res)
//       this.studentTripData = res;
//     })
//   }
//
// }
//
// /**
//  * import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
//  * import { Loader } from '@googlemaps/js-api-loader';
//  *
//  * interface RouteData {
//  *   origin: string;
//  *   destination: string;
//  *   distance?: string;
//  *   duration?: string;
//  *   path?: google.maps.LatLng[];
//  *   bounds?: google.maps.LatLngBounds; // Add bounds property
//  * }
//  *
//  * @Component({
//  *   selector: 'app-tracking',
//  *   template: `
//  *     <div #mapContainer style="height: 400px; width: 100%;"></div>
//  *     <div *ngIf="routeData">
//  *       <p>Distance: {{ routeData.distance }}</p>
//  *       <p>Duration: {{ routeData.duration }}</p>
//  *     </div>
//  *   `,
//  *   styles: []
//  * })
//  * export class TrackingComponent implements OnInit, AfterViewInit {
//  *   @ViewChild('mapContainer', { static: false }) mapRef!: ElementRef;
//  *   map!: google.maps.Map;
//  *   directionsService!: google.maps.DirectionsService;
//  *   directionsRenderer!: google.maps.DirectionsRenderer;
//  *   routeData: RouteData | null = null;
//  *   apiKey: string = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your actual API key
//  *
//  *   constructor() {}
//  *
//  *   ngOnInit(): void {
//  *   }
//  *
//  *   ngAfterViewInit(): void {
//  *     this.loadMap();
//  *   }
//  *
//  *   async loadMap() {
//  *     const loader = new Loader({
//  *       apiKey: this.apiKey,
//  *       version: 'weekly',
//  *       libraries: ['places', 'routes']
//  *     });
//  *
//  *     try {
//  *       await loader.load();
//  *       this.initMap();
//  *     } catch (error) {
//  *       console.error("Error loading Google Maps API:", error);
//  *     }
//  *   }
//  *
//  *   initMap() {
//  *     this.map = new google.maps.Map(this.mapRef.nativeElement, {
//  *       center: { lat: 0, lng: 0 },
//  *       zoom: 7,
//  *     });
//  *
//  *     this.directionsService = new google.maps.DirectionsService();
//  *     this.directionsRenderer = new google.maps.DirectionsRenderer({
//  *       map: this.map,
//  *       suppressMarkers: true // Hide default markers
//  *     });
//  *
//  *     this.calculateRoute({ origin: 'London, UK', destination: 'Paris, France' });
//  *   }
//  *
//  *   calculateRoute(route: { origin: string; destination: string }) {
//  *     const request: google.maps.DirectionsRequest = {
//  *       origin: route.origin,
//  *       destination: route.destination,
//  *       travelMode: google.maps.TravelMode.DRIVING,
//  *     };
//  *
//  *     this.directionsService.route(request, (result, status) => {
//  *       if (status === google.maps.DirectionsStatus.OK) {
//  *         this.directionsRenderer.setDirections(result);
//  *
//  *         const bounds = new google.maps.LatLngBounds(); // Create bounds object
//  *         result.routes[0].legs.forEach(leg => {
//  *           leg.steps.forEach(step => {
//  *             step.path.forEach(point => {
//  *               bounds.extend(point); // Extend bounds to include each point
//  *             });
//  *           });
//  *           bounds.extend(leg.start_location);
//  *           bounds.extend(leg.end_location);
//  *         });
//  *
//  *         this.routeData = {
//  *           origin: route.origin,
//  *           destination: route.destination,
//  *           distance: result?.routes[0]?.legs[0]?.distance?.text,
//  *           duration: result?.routes[0]?.legs[0]?.duration?.text,
//  *           path: result?.routes[0]?.overview_path,
//  *           bounds: bounds // Store the bounds
//  *         };
//  *
//  *         this.map.fitBounds(bounds); // Fit the map to the bounds
//  *
//  *       } else {
//  *         console.error('Directions request failed:', status);
//  *         this.routeData = null;
//  *       }
//  *     });
//  *   }
//  * }
//  */
