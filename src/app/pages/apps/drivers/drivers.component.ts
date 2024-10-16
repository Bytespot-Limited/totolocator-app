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

  constructor(public dialog: MatDialog, private http: HttpClient) {}

  // Lifecycle event to execute the API calls
  ngOnInit(): void {
    this.getDrivers();
  }

  // Fetch drivers from the backend
  getDrivers() {
    this.http.get(environment.apiUrl.concat("drivers?page=0&size=20"))
      .subscribe((res: any) => {
        this.tableData = res;
        console.log("Getting drivers data: {}", res);
      });
  }

  addStudent(request: any): any {
    this.http.post(environment.apiUrl.concat("drivers"), request)
      .subscribe((res: any) => {
        console.log("Added driver: {}", res);
      });
  }

  onViewItem(record: any) {
    console.log("Viewing a driver");
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View',
        formInput: driverForm
      },
    });
  }

  onAddItem(record: any) {
    console.log("Adding a driver");
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View',
        driverData: record,
        formInput: driverForm
      },
    }).afterClosed().subscribe(result => {
      if (result && result.action === 'Add') {
        console.log("Creation value from Student View:", result);
        this.addStudent(result.data);
      }
    });
  }

  onUpdateItem(record: any) {
    console.log("Updating a driver");
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Update',
        formInput: driverForm
      }
    });
  }

  onDeleteItem(record: any) {
    console.log("Deleting a driver");
    const dialogRef = this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Delete',
        local_data: record
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === 'Delete') {
        this.deleteDriver(record.id).subscribe(
          response => {
            console.log('Driver deleted successfully', response);
            // Remove the deleted driver from the local list
            this.tableData = this.tableData.filter(driver => driver.id !== record.id);
          },
          error => {
            console.error('Error deleting driver', error);
            dialogRef.componentInstance.local_data.errorMessage = error.error?.message || 'An error occurred while deleting the vehicle.';
          }
        );
      }
    });
  }

  deleteDriver(id: string) {
    return this.http.delete(environment.apiUrl.concat(`drivers/${id}`));
  }

  // Filter records
  onFilterValue(record: any) {
    console.log("Filtering records of drivers: ", record);
    this.http.get(environment.apiUrl.concat("drivers?name.contains=" + record))
      .subscribe((res: any) => {
        this.tableData = res;
        console.log("Getting drivers data: {}", res);
      });
  }
}
