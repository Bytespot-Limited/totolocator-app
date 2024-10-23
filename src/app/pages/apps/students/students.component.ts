import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { SchoolViewComponent } from "../schools/school-view/school-view.component";
import { IForm } from "../forms/interfaces/IForm";
import { studentForm } from '../forms/student-registration-form-config';
import { environment } from 'environment';


/**
 * {
 *     "id": 0,
 *     "name": "string",
 *     "dob": "2023-12-02",
 *     "classLevel": "GRADE_1",
 *     "profileImageUrl": "string",
 *     "homeAddress": "string",
 *     "longitude": "string",
 *     "latitude": "string",
 *     "billingStatus": "ACTIVE",
 *     "nextBillingCycle": "2023-12-02T13:57:13.407Z",
 *     "entityStatus": "ACTIVE",
 *     "creationDate": "2023-12-02T13:57:13.407Z",
 *     "modifiedDate": "2023-12-02T13:57:13.407Z",
 *     "fleet": {
 *       "id": 0,
 *       "numberPlate": "string",
 *       "vehicleType": "BUS",
 *       "entityStatus": "ACTIVE",
 *       "creationDate": "2023-12-02T13:57:13.407Z",
 *       "modifiedDate": "2023-12-02T13:57:13.407Z",
 *       "terminal": {
 *         "id": 0,
 *         "devideId": "string",
 *         "phoneNumber": "string",
 *         "manufacturer": "string",
 *         "model": "string",
 *         "lastPing": "2023-12-02T13:57:13.407Z",
 *         "longitude": "string",
 *         "latitude": "string",
 *         "status": "ONLINE",
 *         "entityStatus": "ACTIVE",
 *         "creationDate": "2023-12-02T13:57:13.407Z",
 *         "modifiedDate": "2023-12-02T13:57:13.407Z"
 *       },
 *       "school": {
 *         "id": 0,
 *         "name": "string",
 *         "location": "string",
 *         "logoImageUrl": "string",
 *         "emailAddress": "string",
 *         "phoneNumber": "string",
 *         "entityStatus": "ACTIVE",
 *         "creationDate": "2023-12-02T13:57:13.407Z",
 *         "modifiedDate": "2023-12-02T13:57:13.407Z"
 *       }
 *     },
 *     "guardian": {
 *       "id": 0,
 *       "userId": 0,
 *       "name": "string",
 *       "dob": "2023-12-02",
 *       "nationalId": "string",
 *       "profileImageUrl": "string",
 *       "guardianType": "FATHER",
 *       "emailAddress": "string",
 *       "phoneNumber": "string",
 *       "entityStatus": "ACTIVE",
 *       "creationDate": "2023-12-02T13:57:13.407Z",
 *       "modifiedDate": "2023-12-02T13:57:13.407Z"
 *     }
 *   }
 */

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html'
})
export class StudentsComponent {
  studentForm = studentForm as IForm;

  displayedColumns: string[] = [
    'id',
    'name',
    'profileImageUrl',
    'classLevel',
    'billingStatus',
    'entityStatus',
    'creationDate',
    'action',
  ];

  tableHeading: string = "Students";
  tableData: any[] = [];


  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getStudents()
    // this.tableData = employees
  }

  // Fetch schools from the backend
  getStudents() {
    this.http.get(environment.apiUrl.concat("students?page=0&size=20"))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting students data: {}", res)
      })
  }

  addStudent(request: any): any {
    this.http.post(environment.apiUrl.concat("students"), request)
      .subscribe((res: any) => {
        var student = res
        console.log("Added student: {}", res)
        return student;
      })
  }

  updateStudent(id: string, request: any): void {
    this.http.put(environment.apiUrl.concat(`students/${id}`), request)
      .subscribe({
        next: (res: any) => {
          console.log("Updated student:", res);
          this.getStudents(); // Refresh the list after successful update
        },
        error: (error: any) => {
          console.error("Error updating student:", error);
          // Handle error appropriately
        }
      });
  }


  onViewItem(record: any) {
    console.log("Viewing a student");
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
    console.log("Adding a student")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Add',
        studentData: record,
        formInput: studentForm
      },
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log("Creation value from Student View:", result);
        // Use the received value (result) here
        if (result.action === 'Add') {
          this.addStudent(result.data);
        }
      }
    });
  }

  onUpdateItem(record: any) {
    console.log("Updating a student");
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
          this.updateStudent(record.id, updateData);
        }
      }
    });
  }

  // Helper method to populate form with existing data
  private prepareFormWithData(record: any): IForm {
    const populatedForm = { ...this.studentForm };
    populatedForm.formControls = populatedForm.formControls.map(control => ({
      ...control,
      value: record[control.name] ?? control.value
    }));
    return populatedForm;
  }

  onDeleteItem(record: any) {
    console.log("Deleting a student")
    const dialogRef = this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Delete',
        formInput: studentForm
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === 'Delete') {
        this.deleteStudent(record.id).subscribe(
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

  deleteStudent(id: string) {
    return this.http.delete(environment.apiUrl.concat(`students/${id}`));
  }

  // Filter records
  onFilterValue(record: any) {
    console.log("Filtering records of students: ", record);
    this.http.get(environment.apiUrl.concat("students?name.contains=" + record))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting students data: {}", res)
      })
  }
}

