import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {EntityAction} from "./EntityAction";
import {environment} from "../../../../../environment";
import {SchoolViewComponent} from "../schools/school-view/school-view.component";
import {Observable} from "rxjs";
import {IForm} from "../forms/interfaces/IForm";

export class CrudActions {

  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  /**
   * Fetch a single record
   * @param entity
   * @param form
   */
  onViewRecord(entity: EntityAction, form: IForm) {
    const populatedForm = this.prepareFormWithData(entity, form);
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View',
        formInput: populatedForm,
        readOnly: true
      },
    });
  }


  /**
   * Fetch records
   * @param entity
   */
  getRecord(entity: EntityAction): Observable<any> {
    return this.http.get(environment.apiUrl.concat(entity.name).concat("?page=0&size=20"));
  }


  /**
   * Handle action to create a record
   * @param record
   * @param form
   */
  onAddRecord(record: EntityAction, form: IForm) {
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Add',
        organizationData: record.data,
        formInput: form
      }, // Pass relevant data
    }).afterClosed().subscribe(result => {
      if (result) {
        // Create record
        record.data = result.data;
        this.addRecord(record).subscribe({
          next: (res) => {
            this.handleApiRecordResponse(
              res,
              record,
              SchoolViewComponent
            );
          },
          error: (error) => {
            this.handleApiRecordError(
              error,
              record,
              SchoolViewComponent
            );
          },
        });

      }
    });
  }


  /**
   * Add a new record
   * @param entity
   */
  addRecord(entity: EntityAction): Observable<any> {
    console.log("Record added: ", entity);
    return this.http.post(environment.apiUrl.concat(entity.name), entity.data)
  }

  /**
   * Handle action to update a record
   * @param record
   * @param form
   */
  onUpdateRecord(record: EntityAction, form: IForm) {
    const populatedForm = this.prepareFormWithData(record, form);
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
            id: record.id
          };

          // Make the API call
          record.data = updateData;
          this.updateRecord(record).subscribe({
            next: (res) => {
              this.handleApiRecordResponse(
                res,
                record,
                SchoolViewComponent
              );
            },
            error: (error) => {
              this.handleApiRecordError(
                error,
                record,
                SchoolViewComponent
              );
            },
          });
        }
      }
    });
  }


  /**
   * Update a record
   * @param entity
   */
  updateRecord(entity: EntityAction): Observable<any> {
    return this.http.patch(environment.apiUrl.concat(entity.name).concat(`/${entity.id}`), entity.data);
  }

  /**
   * Delete a record
   * @param entity
   */
  onDeleteRecord(entity: EntityAction) {

    const dialogRef = this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Delete',
        local_data: entity,
        errorMessage: 'Are you sure you want to delete the '.concat(entity.name).concat(':').concat(entity.data.name),
        message: ''
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === 'Delete') {
        this.deleteRecord(entity).subscribe(
          response => {
            console.log('Record deleted successfully', response);
            const dialogRef = this.dialog.open(SchoolViewComponent, {
              data: {
                action: 'Notification',
                local_data: response,
                message: 'Deleted record successfully: '.concat(entity.data.name),
              },
            });
          },
          error => {
            console.error('Error deleting record', error);
            const dialogRef = this.dialog.open(SchoolViewComponent, {
              data: {
                action: 'Notification',
                local_data: error,
                message: 'An error occurred deleting organization: '.concat(entity.id),
              },
            });
            // Update the dialog data with the error message
            //dialogRef.componentInstance.local_data.errorMessage = error.error?.message || 'An error occurred while deleting the organisation.';
            // Trigger change detection manually
            //dialogRef.componentInstance.dialogRef.updateSize(); // Optional: adjust dialog size if necessary
          }
        );
      }
    });
  }


  /**
   * Delete a record
   * @param entity
   */
  deleteRecord(entity: EntityAction): Observable<any> {
    return this.http.delete(environment.apiUrl.concat(entity.name).concat(`/${entity.id}`));
  }

  /**
   * Filter records given a name
   * @param record
   */
  onFilterRecord(record: EntityAction): Observable<any> {
    return this.http.get(environment.apiUrl.concat(record.name).concat("?name.contains=" + record.data));
  }


  /**
   * Handle the API responses
   * @param res
   * @param entity
   * @param dialogComponent
   */
  handleApiRecordResponse(
    res: any,
    entity: EntityAction,
    dialogComponent: any
  ): void {
    this.dialog.open(dialogComponent, {
      data: {
        action: 'Notification',
        local_data: res,
        errorMessage: '',
        message: 'Actioned '.concat(entity.name).concat(' successfully: ').concat(res.name),
      },
    });
  }


  /**
   * Function to handle errors thrown by the API call
   * @param error
   * @param entity
   * @param dialogComponent
   */
  handleApiRecordError(error: any, entity: EntityAction, dialogComponent: any): void {
    console.error('Error creating organization:', error);
    this.dialog.open(dialogComponent, {
      data: {
        action: 'Notification',
        local_data: error,
        message: 'An error occurred actioning the record '.concat(entity.name),
      },
    });
  }

  // Helper method to populate form with existing data
  public prepareFormWithData(record: EntityAction, form: IForm): IForm {
    const populatedForm = {...form};
    populatedForm.formControls = populatedForm.formControls.map(control => ({
      ...control,
      value: record.data[control.name] ?? control.value
    }));
    return populatedForm;
  }


}
