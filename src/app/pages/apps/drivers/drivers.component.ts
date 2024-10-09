import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { SchoolViewComponent } from "../schools/school-view/school-view.component";
import { IForm } from "../forms/interfaces/IForm";
import { driverForm } from '../forms/driver-registration-form-config';
import { environment } from 'environment';



@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html'
})
export class DriversComponent {
  driverForm = driverForm as IForm;

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
    this.http.get(environment.apiUrl.concat("drivers?page=0&size=20"))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting drivers data: {}", res)
      })
  }

  addStudent(request: any): any {
    this.http.post(environment.apiUrl.concat("drivers"), request)
      .subscribe((res: any) => {
        var driver = res
        console.log("Added driver: {}", res)
        return driver;
      })
  }

  onViewItem(record: any) {
    console.log("Viewing a driver")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View',
        formInput: driverForm
      },
    });
  }

  onAddItem(record: any) {
    console.log("Adding a driver")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View',
        driverData: record,
        formInput: driverForm
      }, // Pass relevant data
    }).afterClosed().subscribe(result => {
      if (result) { // Check if dialog closed with a value
        console.log("Creation value from Student View:", result);
        // Use the received value (result) here
        if (result.action === 'Add') {
          this.addStudent(result.data);
        }
      }
    });
  }

  onUpdateItem(record: any) {
    console.log("Updating a driver")
    this.dialog.open(SchoolViewComponent), {
      data: {
        action: 'Update',
        formInput: driverForm
      }
    };
  }

  onDeleteItem(record: any) {
    console.log("Deleting a driver")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Delete',
        formInput: driverForm
      },
    });
  }

  // Filter records
  onFilterValue(record: any) {
    console.log("Filtering records of drivers: ", record);
    this.http.get(environment.apiUrl.concat("drivers?name.contains=" + record))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting drivers data: {}", res)
      })
  }
}

