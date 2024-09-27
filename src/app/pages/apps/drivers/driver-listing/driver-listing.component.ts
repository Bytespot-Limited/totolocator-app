import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from "@angular/common/http";
import {SchoolViewComponent} from "../../schools/school-view/school-view.component";

@Component({
  templateUrl: './driver-listing.component.html'
})
export class DriverListingComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'phoneNumber',
    'profileImageUrl',
    'assignmentStatus',
    'entityStatus',
    'creationDate',
    'action',
  ];

  tableHeading: string = "Drivers";
  tableData: any[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getDrivers()
    // this.tableData = employees
  }

  // Fetch drivers from the backend
  getDrivers() {
    this.http.get("https://harmony-api-d3c63c482f2e.herokuapp.com/api/drivers?page=0&size=20")
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting drivers data: {}", res)
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
    console.log("Deleting a school")
    this.dialog.open(SchoolViewComponent, {
      data: {action: 'Delete'},
    });
  }

  // Filter records
  onFilterValue(record: any) {
    console.log("Filtering records of drivers: ", record);
    this.http.get("http://localhost:8080/api/drivers?name.contains=" + record)
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting drivers data: {}", res)
    })
  }
}
