import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { SchoolViewComponent } from "../schools/school-view/school-view.component";
import { NavigationExtras, Router } from "@angular/router";
import { environment } from 'environment';
import { IForm } from '../forms/interfaces/IForm';
import { tripForm } from '../forms/trip-registration-form-config';

/**
 * {
 *     "id": 0,
 *     "tripType": "PICKUP",
 *     "tripStatus": "STARTED",
 *     "startTime": "2023-12-02T14:37:48.226Z",
 *     "endTime": "2023-12-02T14:37:48.226Z",
 *     "entityStatus": "ACTIVE",
 *     "creationDate": "2023-12-02T14:37:48.226Z",
 *     "modifiedDate": "2023-12-02T14:37:48.226Z"
 *   }
 */

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html'
})
export class TripsComponent implements OnInit {
  tripForm = tripForm as IForm;

  displayedColumns: string[] = [
    'id',
    'tripType',
    'tripStatus',
    'startTime',
    'endTime',
    'action',
  ];
  tableHeading: string = "Trips";
  tableData: any[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient, private router: Router) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getTrips()
    // this.tableData = employees
  }

  // Fetch schools from the backend
  getTrips() {
    this.http.get(environment.apiUrl.concat("trips?page=0&size=20"))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting school trips data: {}", res)
      })
  }

  createTrip(request: any): any {
    this.http.post(environment.apiUrl.concat("trips"), request)
      .subscribe((res: any) => {
        var trip = res
        console.log("Created trip: {}", res)
        return trip;
      })
  }

  onViewItem(record: any) {
    console.log("Viewing a school trip: {}", record);
    this.navigateToComponent(record.id);
  }

  onAddItem(record: any) {
    console.log("Adding a trip")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View',
        tripData: record,
        formInput: tripForm
      }, // Pass relevant data
    }).afterClosed().subscribe(result => {
      if (result) { // Check if dialog closed with a value
        console.log("Creation value from Trip View:", result);
        // Use the received value (result) here
        if (result.action === 'Add') {
          this.createTrip(result.data);
        }
      }
    });

  }

  onUpdateItem(record: any) {
    console.log("Updating a school")
    this.dialog.open(SchoolViewComponent);
  }

  onDeleteItem(record: any) {
    console.log("Deleting a school")
    this.dialog.open(SchoolViewComponent, {
      data: { action: 'Delete' },
    });
  }

  navigateToComponent(id: number) {
    this.router.navigate(['apps/trips/students', id]);
  }

}

