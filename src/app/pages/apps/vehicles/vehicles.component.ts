import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { SchoolViewComponent } from "../schools/school-view/school-view.component";
import { IForm } from "../forms/interfaces/IForm";
import { vehicleForm } from '../forms/vehicle-registration-form-config';
import { environment } from 'environment';


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
export class VehiclesComponent implements OnInit {
  vehicleForm = vehicleForm as IForm;

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
    // this.tableData = employees
  }

  // Fetch schools from the backend
  getVehicles() {
    this.http.get(environment.apiUrl.concat("fleets?page=0&size=20"))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting vehicles data: {}", res)
      })
  }

  addVehicle(request: any): any {
    this.http.post(environment.apiUrl.concat("fleets"), request)
      .subscribe((res: any) => {
        var vehicle = res
        console.log("Added vehicle: {}", res)
        return vehicle;
      })
  }

  updateVehicle(id: string, request: any): void {  
    this.http.put(environment.apiUrl.concat(`fleets/${id}`), request)
      .subscribe({
        next: (res: any) => {
          console.log("Updated vehicle:", res);
          this.getVehicles(); // Refresh the list after successful update
        },
        error: (error: any) => {
          console.error("Error updating vehicle:", error);
          // Handle error appropriately
        }
      });
  }

  onViewItem(record: any) {
    console.log("Viewing a vehicle");
    const populatedForm = this.prepareFormWithData(record);
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View',
        formInput: populatedForm,
        readOnly: true 
      },
    });
  }

  onAddItem(record: any) {
    console.log("Adding a vehicle")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Add',
        vehicleData: record,
        formInput: vehicleForm
      }, // Pass relevant data
    }).afterClosed().subscribe(result => {
      if (result) { // Check if dialog closed with a value
        console.log("Creation value from Vehicle View:", result);
        // Use the received value (result) here
        if (result.action === 'Add') {
          this.addVehicle(result.data);
        }
      }
    });
  }

  onUpdateItem(record: any) {
    console.log("Updating a vehicle");
    const populatedForm = this.prepareFormWithData(record);

    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Update',
        formInput: populatedForm,
        id: record.id
      },
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log("Update dialog result:", result);
        if (result.action === 'Update') {
          const updateData = {
            ...result.data,
            id: record.id  // Ensure ID is preserved
          };
          this.updateVehicle(record.id, updateData);
        }
      }
    });
  }

  // Helper method to populate form with existing data
  private prepareFormWithData(record: any): IForm {
    const populatedForm = { ...this.vehicleForm };
    populatedForm.formControls = populatedForm.formControls.map(control => ({
      ...control,
      value: record[control.name] ?? control.value
    }));
    return populatedForm;
  }


  onDeleteItem(record: any) {
    console.log("Deleting a vehicle");

    const dialogRef = this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Delete',
        local_data: record
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === 'Delete') {
        this.deleteVehicle(record.id).subscribe(
          response => {
            console.log('Vehicle deleted successfully', response);
            // Optionally, refresh the list or update the UI
          },
          error => {
            console.error('Error deleting vehicle', error);
            // Pass the error message back to the dialog
            dialogRef.componentInstance.local_data.errorMessage = error.error?.message || 'An error occurred while deleting the vehicle.';
          }
        );
      }
    });
  }

  deleteVehicle(id: string) {
    return this.http.delete(environment.apiUrl.concat(`fleets/${id}`));
  }

  // Filter records
  onFilterValue(record: any) {
    console.log("Filtering records of vehicles: ", record);
    this.http.get(environment.apiUrl.concat("vehicles?name.contains=" + record))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting vehicles data: {}", res)
      })
  }
}

