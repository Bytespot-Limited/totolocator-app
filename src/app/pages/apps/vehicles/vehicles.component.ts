import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {SchoolViewComponent} from "../schools/school-view/school-view.component";

/**
 *  {
 *     "id": 0,
 *     "numberPlate": "string",
 *     "vehicleType": "BUS",
 *     "entityStatus": "ACTIVE",
 *     "creationDate": "2023-12-02T14:26:59.956Z",
 */

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html'
})
export class VehiclesComponent {

  displayedColumns: string[] = [
    'id',
    'numberPlate',
    'vehicleType',
    'entityStatus',
    'creationDate',
    'action',
  ];
  tableHeading: string = "Vehicles";
  tableData: any[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getVehicles()
  }

  // Fetch schools from the backend
  getVehicles() {
    this.http.get("https://harmony-api-d3c63c482f2e.herokuapp.com/api/fleets?page=0&size=20")
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting vehicles data: {}", res)
    })
  }

  onViewItem(record: any) {
    console.log("Viewing a school")
    this.dialog.open(SchoolViewComponent, {
      data: {action: 'View'},
    });
  }

  onAddItem(record: any) {
    console.log("Adding a school")
    this.dialog.open(SchoolViewComponent);

  }

  onUpdateItem(record: any) {
    console.log("Updating a school")
    this.dialog.open(SchoolViewComponent);
  }

  onDeleteItem(record: any) {
    console.log("Deleting a fleets")
    this.dialog.open(SchoolViewComponent, {
      data: {action: 'Delete'},
    });
  }

  // Filter records
  onFilterValue(record: any) {
    console.log("Filtering records of fleets: ", record);
    this.http.get("http://localhost:8080/api/fleets?numberPlate.contains=" + record)
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting fleets data: {}", res)
    })
  }

}

