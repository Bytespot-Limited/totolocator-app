import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environment";


@Component({
  selector: 'app-terminal-view',
  templateUrl: './terminal-view.component.html',
  standalone: false
})
export class TerminalViewComponent implements AfterViewInit, OnInit {
  terminalId: any;
  map: any;
  marker: any;

  terminal: any;
  vehicle: any;
  driver: any;

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
  }

  /**
   * Initiation the map
   * @private
   */
  private initMap() {
    if (this.map) return; // prevent re-initialization from the polling interval
    const busIcon = L.icon({
      iconUrl: 'assets/images/maps/school_bus.png',  // Path to your bus icon
      iconSize: [32, 32],  // Size of the icon
      iconAnchor: [16, 16],  // Anchor point of the icon, centered
      popupAnchor: [0, -16],  // Popup anchor, offsets the popup from the icon
    });
    console.log("Loading map with data: {}", this.terminal);

    this.map = L.map('map').setView([Number(this.terminal.latitude), Number(this.terminal.longitude)], 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const driverName = this.driver?.name ?? 'Unknown Driver';
    const numberPlate = this.vehicle?.numberPlate ?? 'Unknown Vehicle';

    this.marker = L.marker([Number(this.terminal.latitude), Number(this.terminal.longitude)], {icon: busIcon})
      .addTo(this.map)
      .bindPopup(`Driver: ${driverName}<br>Vehicle: ${numberPlate}`)
      .openPopup();

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
    this.http.get(environment.apiUrl.concat("terminals/" + id))
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
    await this.http.get(environment.apiUrl.concat("fleets?terminalId.equald=" + id))
    .subscribe((res: any) => {
      console.log("Getting vehicle information: {}", res)
      this.vehicle = res[0];
      if (this.vehicle?.id) {
        this.fetchDriverInfo(this.vehicle.id);
      } else {
        this.initMap();
      }
    })
  }

  fetchDriverInfo(fleetId: number) {
    this.http.get(environment.apiUrl.concat("drivers?fleetId.equals=" + fleetId))
    .subscribe((res: any) => {
      console.log("Getting driver information: {}", res)
      this.driver = res[0];
      this.initMap();
    })
  }

}
