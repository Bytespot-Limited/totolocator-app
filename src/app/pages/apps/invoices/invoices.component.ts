import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {SchoolViewComponent} from "../schools/school-view/school-view.component";

/**
 * [
 *   {
 *     "id": 0,
 *     "paymentChannel": "string",
 *     "paymentReference": "string",
 *     "subscriptionStart": "2023-12-02T14:50:51.422Z",
 *     "subscriptionEnd": "2023-12-02T14:50:51.422Z",
 *     "student": {
 *       "id": 0,
 *       "name": "string",
 *       "dob": "2023-12-02",
 *       "classLevel": "GRADE_1",
 *       "profileImageUrl": "string",
 *       "homeAddress": "string",
 *       "longitude": "string",
 *       "latitude": "string",
 *       "billingStatus": "ACTIVE",
 *       "nextBillingCycle": "2023-12-02T14:50:51.422Z",
 *       "entityStatus": "ACTIVE",
 *       "creationDate": "2023-12-02T14:50:51.422Z",
 *       "modifiedDate": "2023-12-02T14:50:51.422Z",
 *       "fleet": {
 *         "id": 0,
 *         "numberPlate": "string",
 *         "vehicleType": "BUS",
 *         "entityStatus": "ACTIVE",
 *         "creationDate": "2023-12-02T14:50:51.422Z",
 *         "modifiedDate": "2023-12-02T14:50:51.422Z",
 *         "terminal": {
 *           "id": 0,
 *           "devideId": "string",
 *           "phoneNumber": "string",
 *           "manufacturer": "string",
 *           "model": "string",
 *           "lastPing": "2023-12-02T14:50:51.422Z",
 *           "longitude": "string",
 *           "latitude": "string",
 *           "status": "ONLINE",
 *           "entityStatus": "ACTIVE",
 *           "creationDate": "2023-12-02T14:50:51.422Z",
 *           "modifiedDate": "2023-12-02T14:50:51.422Z"
 *         },
 *         "school": {
 *           "id": 0,
 *           "name": "string",
 *           "location": "string",
 *           "logoImageUrl": "string",
 *           "emailAddress": "string",
 *           "phoneNumber": "string",
 *           "entityStatus": "ACTIVE",
 *           "creationDate": "2023-12-02T14:50:51.422Z",
 *           "modifiedDate": "2023-12-02T14:50:51.422Z"
 *         }
 *       },
 *       "guardian": {
 *         "id": 0,
 *         "userId": 0,
 *         "name": "string",
 *         "dob": "2023-12-02",
 *         "nationalId": "string",
 *         "profileImageUrl": "string",
 *         "guardianType": "FATHER",
 *         "emailAddress": "string",
 *         "phoneNumber": "string",
 *         "entityStatus": "ACTIVE",
 *         "creationDate": "2023-12-02T14:50:51.422Z",
 *         "modifiedDate": "2023-12-02T14:50:51.422Z"
 *       }
 *     }
 *   }
 */
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent {
  displayedColumns: string[] = [
    'id',
    'student.fleet.school.name',
    'student.name',
    'subscriptionStart',
    'subscriptionEnd',
    'student.billingStatus',
    'action',
  ];
  tableHeading: string = "Invoices";
  tableData: any[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getStudentInvoices()
  }

  // Fetch schools from the backend
  getStudentInvoices() {
    this.http.get("https://harmony-api-d3c63c482f2e.herokuapp.com/api/student-billings?page=0&size=20")
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting student billings data: {}", res)
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

}
