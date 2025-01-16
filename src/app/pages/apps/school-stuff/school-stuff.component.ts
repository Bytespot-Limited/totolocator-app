import {Component, OnInit} from '@angular/core';
import {SchoolViewComponent} from "../schools/school-view/school-view.component";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {CrudActions} from "../reusable/CrudActions";
import {schoolForm} from "../forms/school-registration-form-config";
import {IForm} from "../forms/interfaces/IForm";
import {EntityAction} from "../reusable/EntityAction";
import {schoolStuffForm} from "../forms/school-stuff-form-config";

/**
 *  {
 *     "id": 0,
 *     "userId": 0,
 *     "name": "string",
 *     "roleDescription": "string",
 *     "dob": "2023-12-02",
 *     "nationalId": "string",
 *     "profileImageUrl": "string",
 *     "emailAddress": "string",
 *     "phoneNumber": "string",
 *     "entityStatus": "ACTIVE",
 *     "creationDate": "2023-12-02T13:35:46.545Z",
 *     "modifiedDate": "2023-12-02T13:35:46.545Z"
 *   }
 */

@Component({
  selector: 'app-school-stuff',
  templateUrl: './school-stuff.component.html'
})
export class SchoolStuffComponent extends CrudActions implements OnInit {
  recordForm =  schoolStuffForm as IForm;
  displayedColumns: string[];
  tableHeading: string;
  tableData: any[];
  entityName: string = 'school-staffs';

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

