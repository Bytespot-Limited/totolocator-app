import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {SchoolViewComponent} from "../schools/school-view/school-view.component";
import { IForm } from '../forms/interfaces/IForm';
import { guardianForm } from '../forms/guardian-registration-form-config';
import { environment } from 'environment.prod';

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
    console.log("Filtering records of guardians: ", record);
    this.http.get("https://harmony-api-d3c63c482f2e.herokuapp.com/api/guardians?name.contains=" + record)
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting guardians data: {}", res)
    })

  }

}
