import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-terminal-view',
  templateUrl: './terminal-view.component.html'
})
export class TerminalViewComponent implements AfterViewInit, OnInit {
  terminalId: any;
  map: any;
  marker: any;
  studentMarker: any;

  terminal: any;
  vehicle: any;

  hide = true;
  hide2 = true;
  conhide = true;
  alignhide = true;

  // 3 accordian
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  panelOpenState = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.terminalId = params.get('id');  // Use '+' to convert the parameter to a number if needed
      console.log('Received terminal ID:', this.terminalId);
    });
    this.fetchTerminalInfo(this.terminalId);


  }

  ngAfterViewInit() {
    L.Icon.Default.imagePath = 'assets/images/maps/';
    // this.fetchVehicleInfo(this.terminalId);
    // this.initMap();
  }

  /**
   * Initiation the map
   * @private
   */
  private initMap() {
    const busIcon = L.icon({
      iconUrl: 'assets/images/maps/school_bus.png',  // Path to your bus icon
      iconSize: [32, 32],  // Size of the icon
      iconAnchor: [16, 16],  // Anchor point of the icon, centered
      popupAnchor: [0, -16],  // Popup anchor, offsets the popup from the icon
    });
    console.log("Loading map with data: {}", this.terminal);

    this.map = L.map('map').setView([Number(this.terminal.latitude), Number(this.terminal.longitude)], 15); // Set initial coordinates and zoom level

    const getMarkers = (): L.Marker[] => {
      return [
        new L.Marker(new L.LatLng(43.5121264, 16.4700729), {
          icon: new L.Icon({
            iconSize: [50, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/blue-marker.svg',
          }),
          title: 'Workspace'
        } as L.MarkerOptions),
        new L.Marker(new L.LatLng(43.5074826, 16.4390046), {
          icon: new L.Icon({
            iconSize: [50, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/red-marker.svg',
          }),
          title: 'Riva'
        } as L.MarkerOptions),
      ] as L.Marker[];
    };

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    this.marker = L.marker([Number(this.terminal.latitude), Number(this.terminal.longitude)], {icon: busIcon}).addTo(this.map)
    .bindPopup("Driver: John Mwangi.<br>Vehicle: KDH 722E")
    .openPopup();

    this.studentMarker = L.marker([Number(-1.2509837), Number(36.783291)], {icon: busIcon}).addTo(this.map)
    .bindPopup("Driver: John Mwangi.<br>Vehicle: KDH 722E")
    .openPopup();
    L.polyline([L.latLng(this.terminal.latitude,this.terminal.longitude),
    L.latLng(-1.2509837, 36.783291)], { color: '#0d9148'})
    .addTo(this.map);

    // Set up the interval to refresh the map every 5 seconds
    setInterval(() => {
      console.log("Refreshing the coordinates for terminal: {}", this.terminalId)
      this.fetchTerminalInfo(this.terminalId);
      //this.fetchVehicleInfo(this.terminalId);

      // Update the marker position (you can replace this with your own logic to fetch new coordinates)
      const newCoordinates = [Number(this.terminal.latitude), Number(this.terminal.longitude)];
      this.marker.setLatLng(newCoordinates);
    }, 10000);
  }

  /**
   * Fetch terminal information
   * @param id
   */
  fetchTerminalInfo(id: number) {
    this.http.get("http://localhost:8080/api/terminals/" + id)
    .subscribe((res: any) => {
      console.log("Getting terminal information: {}", res)
      this.terminal = res;
      this.fetchVehicleInfo(id)

    })
  }

  /**
   * Fetch terminal information
   * @param id
   */
  async fetchVehicleInfo(id: number) {
    await this.http.get("http://localhost:8080/api/fleets?terminalId.equald=" + id)
    .subscribe((res: any) => {
      console.log("Getting vehicle information: {}", res)
      this.vehicle = res[0];
      this.initMap();
    })
  }

}
