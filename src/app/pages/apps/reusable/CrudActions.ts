import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {EntityAction} from "./EntityAction";
import {environment} from "../../../../../environment";
import {SchoolViewComponent} from "../schools/school-view/school-view.component";
import {Observable} from "rxjs";

export class CrudActions {

  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  /**
   * Fetch records
   * @param entity
   */
  getRecord(entity: EntityAction): Observable<any> {
    return this.http.get(environment.apiUrl.concat(entity.name).concat("?page=0&size=20"));
  }


  /**
   * Add a new record
   * @param entity
   */
  addRecord(entity: EntityAction): Observable<any> {
    return this.http.post(environment.apiUrl.concat(entity.name), entity.data)
  }

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
        message: 'Created '.concat(entity.name).concat(' successfully: ').concat(res.name),
      },
    });
  }


  handleApiRecordError(error: any, failureMessage: string, dialogComponent: any): void {
    console.error('Error creating organization:', error);
    this.dialog.open(dialogComponent, {
      data: {
        action: 'Notification',
        local_data: error,
        message: failureMessage,
      },
    });
  }

  /**
   * Update a record
   * @param entity
   */
  updateRecord(entity: EntityAction): any {
    this.http.patch(environment.apiUrl.concat(entity.name).concat(`/${entity.id}`), entity.data)
    .subscribe({
      next: (res: any) => {
        const dialogRef = this.dialog.open(SchoolViewComponent, {
          data: {
            action: 'Notification',
            local_data: res,
            message: 'Updated '.concat(entity.name).concat(' successfully: ').concat(res.name)
          },
        });
        console.log("Updated {} : {}", entity.name, res)
        return res;
      },
      error: (error: any) => {
        console.error("Error creating {}: {}", entity.name, error);
        // Handle error appropriately
        const dialogRef = this.dialog.open(SchoolViewComponent, {
          data: {
            action: 'Notification',
            local_data: error,
            message: 'An error occurred updating the '.concat(entity.name),
          },
        });
      }
    });
  }


  /**
   * Delete a record
   * @param entity
   */
  deleteItem(entity: EntityAction) {
    const dialogRef = this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Delete',
        local_data: entity.data,
        errorMessage: 'Are you sure you want to delete the '.concat(entity.name).concat(' : ').concat(entity.id),
        message: ''
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === 'Delete') {
        this.deleteApi(entity).subscribe(
          response => {
            console.log('{} deleted successfully', entity.name, response);
            const dialogRef = this.dialog.open(SchoolViewComponent, {
              data: {
                action: 'Notification',
                local_data: response,
                message: 'Deleted '.concat(entity.name).concat('successfully: ').concat(entity.id)
              },
            });
          },
          error => {
            console.error("Error creating {}: {}", entity.name, error);
            const dialogRef = this.dialog.open(SchoolViewComponent, {
              data: {
                action: 'Notification',
                local_data: error,
                message: 'An error occurred deleting the '.concat(entity.name),
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

  deleteApi(entity: EntityAction) {
    return this.http.delete(environment.apiUrl.concat(entity.name).concat(`/${entity.id}`));
  }


}
