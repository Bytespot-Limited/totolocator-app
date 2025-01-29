import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import {CrudActions} from "../reusable/CrudActions";
import {IForm} from "../forms/interfaces/IForm";
import {EntityAction} from "../reusable/EntityAction";
import {terminalForm} from "../forms/terminals-form-config";
import {Router} from "@angular/router";

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html'
})
export class TerminalsComponent extends CrudActions implements OnInit {
  recordForm = terminalForm as IForm;
  displayedColumns: string[];
  tableHeading: string;
  tableData: any[];
  entityName: string = 'terminals';

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
    let entity: EntityAction = {
      name: this.entityName,
      id: '',
      data: record
    };
    this.navigateToComponent(record.id)
    //this.onViewRecord(entity, this.recordForm);
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

  navigateToComponent(id: number) {
    this.router.navigate(['apps/terminals', id]);
  }

}

