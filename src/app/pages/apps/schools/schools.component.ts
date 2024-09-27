import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SchoolViewComponent} from "./school-view/school-view.component";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../../../environment";


@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
})
export class SchoolsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'logoImageUrl',
    'location',
    'entityStatus',
    'action',
  ];

  tableHeading: string = "School";
  tableData: any[] = [];


  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getSchools()
    // this.tableData = employees
  }

  // Fetch schools from the backend
  getSchools() {
    this.http.get(environment.apiUrl.concat("schools?page=0&size=20"))
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting schools data: {}", res)
    })
  }

  // Get school record to edit
  editSchool(data: any) {
    //debugger

  }


  // Get school record to delete
  deleteSchool(data: any) {
    //debugger

  }

  onViewItem(record: any) {
    console.log("Viewing a school")
    this.dialog.open(SchoolViewComponent, {
      data: {action: 'View'},
    });
  }

  onAddItem(record: any) {
    console.log("Adding a school")
    this.dialog.open(SchoolViewComponent, {
      data: {action: 'View', schoolData: record}, // Pass relevant data
    }).afterClosed().subscribe(result => {
      if (result) { // Check if dialog closed with a value
        console.log("Creation value from School View:", result);
        // Use the received value (result) here
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
      data: {action: 'Delete'},
    });
  }

  // Filter records
  onFilterValue(record: any) {
    console.log("Filtering records of schools: ", record);
    this.http.get(environment.apiUrl.concat("schools?name.contains=" + record))
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting schools data: {}", res)
    })
  }

}
