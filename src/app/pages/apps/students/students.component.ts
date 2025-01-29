import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import {IForm} from "../forms/interfaces/IForm";
import {studentForm} from '../forms/student-registration-form-config';
import {CrudActions} from "../reusable/CrudActions";
import {EntityAction} from "../reusable/EntityAction";


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
    templateUrl: './students.component.html',
    standalone: false
})
export class StudentsComponent extends CrudActions implements OnInit {
  recordForm = studentForm as IForm;
  displayedColumns: string[];
  tableHeading: string;
  tableData: any[];
  entityName: string = 'students';

  constructor(http: HttpClient, dialog: MatDialog) {
    super(dialog, http); // Pass dependencies to the parent class
    this.displayedColumns = this.recordForm.displayColumns;
    this.tableHeading = this.recordForm.formTitle;
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getRecords()
  }

  // Fetch schools from the backend
  getRecords() {
    let entity: EntityAction = {
      name: this.entityName,
      id: '',
      data: ''
    };
    this.getRecord(entity).subscribe((response) => {
      this.tableData = response
    });
  }

  /**
   * Process the action to view a single  record
   * @param record
   */
  onViewItem(record: any) {
    let entity: EntityAction = {
      name: this.entityName,
      id: '',
      data: record
    };
    this.onViewRecord(entity, this.recordForm);
  }

  /**
   * Process the action to add a new record
   * @param record
   */
  onAddItem(record: any) {
    let entity: EntityAction = {
      name: this.entityName,
      id: '',
      data: record
    };
    this.onAddRecord(entity, this.recordForm);
  }


  /**
   * Handle action to update a record
   * @param record
   */
  onUpdateItem(record: any) {
    let entity: EntityAction = {
      name: this.entityName,
      id: record.id,
      data: record
    };
    this.onUpdateRecord(entity, this.recordForm);
  }

  /**
   * Handle action to delete a record
   * @param record
   */
  onDeleteItem(record: any) {
    let entity: EntityAction = {
      name: this.entityName,
      id: record.id,
      data: record
    };
    this.onDeleteRecord(entity);
  }

  /**
   * Handle action to filter records
   * @param record
   */
  onFilterValue(record: any) {
    let entity: EntityAction = {
      name: this.entityName,
      id: '',
      data: record
    };
    this.onFilterRecord(entity).subscribe((response) => {
      this.tableData = response
    });
  }

}


