import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import {Router} from "@angular/router";
import {IForm} from '../forms/interfaces/IForm';
import {tripForm} from '../forms/trip-registration-form-config';
import {CrudActions} from "../reusable/CrudActions";
import {EntityAction} from "../reusable/EntityAction";

/**
 * {
 *     "id": 0,
 *     "tripType": "PICKUP",
 *     "tripStatus": "STARTED",
 *     "startTime": "2023-12-02T14:37:48.226Z",
 *     "endTime": "2023-12-02T14:37:48.226Z",
 *     "entityStatus": "ACTIVE",
 *     "creationDate": "2023-12-02T14:37:48.226Z",
 *     "modifiedDate": "2023-12-02T14:37:48.226Z"
 *   }
 */

@Component({
    selector: 'app-trips',
    templateUrl: './trips.component.html',
    standalone: false
})
export class TripsComponent extends CrudActions implements OnInit {
  recordForm = tripForm as IForm;
  displayedColumns: string[];
  tableHeading: string;
  tableData: any[];
  entityName: string = 'trips';

  constructor(http: HttpClient, dialog: MatDialog, private router: Router) {
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
    this.navigateToComponent(record.id);
  }

  /**
   * Navigate to the view page to see a list of students
   * @param id
   */
  navigateToComponent(id: number) {
    this.router.navigate(['apps/trips/students', id]);
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

