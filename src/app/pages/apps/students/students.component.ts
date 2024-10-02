import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {SchoolViewComponent} from "../schools/school-view/school-view.component";
import {IForm} from "../forms/interfaces/IForm";
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

  onViewItem(record: any) {
    console.log("Viewing a student")
    this.dialog.open(SchoolViewComponent, {
      data: {action: 'View',
        formInput: studentForm
      },
    });
  }

  onAddItem(record: any) {
    console.log("Adding a student")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View', 
        studentData: record,
        formInput: studentForm
      }, // Pass relevant data
    }).afterClosed().subscribe(result => {
      if (result) { // Check if dialog closed with a value
        console.log("Creation value from Student View:", result);
        // Use the received value (result) here
        if (result.action === 'Add'){
          this.addStudent(result.data);
        }
      }
    });
  }

  onUpdateItem(record: any) {
    console.log("Updating a student")
    this.dialog.open(SchoolViewComponent),{
      data: {
        action: 'Update',
        formInput: studentForm
      }
    };
  }

  onDeleteItem(record: any) {
    console.log("Deleting a student")
    this.dialog.open(SchoolViewComponent, {
      data: {action: 'Delete',
        formInput: studentForm
      },
    });
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

