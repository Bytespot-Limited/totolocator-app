import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { SchoolViewComponent } from "../schools/school-view/school-view.component";
import { IForm } from "../forms/interfaces/IForm";
import { guardianForm } from '../forms/guardian-registration-form-config';
import { environment } from 'environment';

/**
 * {
 *     "id": 0,
 *     "userId": 0,
 *     "name": "string",
 *     "dob": "2023-12-02",
 *     "nationalId": "string",
 *     "profileImageUrl": "string",
 *     "guardianType": "FATHER",
 *     "emailAddress": "string",
 *     "phoneNumber": "string",
 *     "entityStatus": "ACTIVE",
 *     "creationDate": "2023-12-02T13:48:45.495Z",
 *     "modifiedDate": "2023-12-02T13:48:45.495Z"
 *   }
 */

@Component({
  selector: 'app-guardians',
  templateUrl: './guardians.component.html'
})
export class GuardiansComponent {
  guardianForm = guardianForm as IForm;

  displayedColumns: string[] = [
    'id',
    'name',
    'profileImageUrl',
    'guardianType',
    'phoneNumber',
    'entityStatus',
    'creationDate',
    'action',
  ];

  tableHeading: string = "Guardians";
  tableData: any[] = [];


  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getGuardians()
    // this.tableData = employees
  }

  // Fetch schools from the backend
  getGuardians() {
    this.http.get(environment.apiUrl.concat("guardians?page=0&size=20"))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting guardians data: {}", res)
      })
  }

  addGuardian(request: any): any {
    this.http.post(environment.apiUrl.concat("guardians"), request)
      .subscribe((res: any) => {
        var guardian = res
        console.log("Added guardian: {}", res)
        return guardian;
      })
  }

  updateGuardian(id: string, request: any): void {
    this.http.put(environment.apiUrl.concat(`guardians/${id}`), request)
      .subscribe({
        next: (res: any) => {
          console.log("Updated guardian:", res);
          this.getGuardians(); // Refresh the list after successful update
        },
        error: (error: any) => {
          console.error("Error updating guardian:", error);
          // Handle error appropriately
        }
      });
  }

  onViewItem(record: any) {
    console.log("Viewing a guardian")
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
    console.log("Adding a guardian")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Add',
        guardianData: record,
        formInput: guardianForm
      }, // Pass relevant data
    }).afterClosed().subscribe(result => {
      if (result) { // Check if dialog closed with a value
        console.log("Creation value from Organization View:", result);
        // Use the received value (result) here
        if (result.action === 'Add') {
          this.addGuardian(result.data);
        }
      }
    });
  }

  onUpdateItem(record: any) {
    console.log("Updating a guardian");
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
          this.updateGuardian(record.id, updateData);
        }
      }
    });
  }

  // Helper method to populate form with existing data
  private prepareFormWithData(record: any): IForm {
    const populatedForm = { ...this.guardianForm };
    populatedForm.formControls = populatedForm.formControls.map(control => ({
      ...control,
      value: record[control.name] ?? control.value
    }));
    return populatedForm;
  }


  onDeleteItem(record: any) {
    console.log("Deleting a guardian")
    const dialogRef = this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Delete',
        local_data: record,
        errorMessage: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === 'Delete') {
        this.deleteGuardian(record.id).subscribe(
          response => {
            console.log('Guardian deleted successfully', response);
            // Optionally, refresh the list or update the UI
          },
          error => {
            console.error('Error deleting guardian', error);
            // Pass the error message back to the dialog
            dialogRef.componentInstance.local_data.errorMessage = error.error?.message || 'An error occurred while deleting the vehicle.';
          }
        );
      }
    });
  }
  deleteGuardian(id: string) {
    return this.http.delete(environment.apiUrl.concat(`guardians/${id}`));
  }

  // Filter records
  onFilterValue(record: any) {
    console.log("Filtering records of guardians: ", record);
    this.http.get(environment.apiUrl.concat("guardians?name.contains=" + record))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting guardians data: {}", res)
      })
  }
}

