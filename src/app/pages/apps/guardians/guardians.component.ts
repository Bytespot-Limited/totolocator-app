import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { SchoolViewComponent } from "../schools/school-view/school-view.component";
import { IForm } from '../forms/interfaces/IForm';
import { guardianForm } from '../forms/guardian-registration-form-config';
import { environment } from 'environment';
import { FormInput } from '../reusable/crud-form/FormInput';

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
export class GuardiansComponent implements OnInit {
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

  // Fetch guardians from the backend
  getGuardians() {
    this.http.get(environment.apiUrl.concat("/guardians?page=0&size=20"))
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

  // Get guardians record to edit
  editGuardians(data: any) {
    //debugger

  }


  // Get guardians record to delete
  deleteGuardians(data: any) {
    //debugger

  }

  onViewItem(record: any) {
    console.log("Viewing a guardian")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View',
        FormInput: guardianForm
      },
    });
  }

  onAddItem(record: any) {
    console.log("Adding a guardian")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Add',
        FormInput: guardianForm
      },
    }).afterClosed().subscribe(result => {
      console.log("Creation value from organization View:", result);
      if (result.action === 'Add') {
        this.addGuardian(result.data);
      }
    });

  }

  onUpdateItem(record: any) {
    console.log("Updating a guardian")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Update',
        FormInput: guardianForm
      },
    });
  }

  onDeleteItem(record: any) {
    console.log("Deleting a guardian")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Delete',
        FormInput: guardianForm
      },
    });
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
