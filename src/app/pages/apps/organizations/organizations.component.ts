import {Component, OnInit} from '@angular/core';
import {SchoolViewComponent} from '../schools/school-view/school-view.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {organizationForm} from "../forms/institution-registration-form-config";
import {IForm} from "../forms/interfaces/IForm";
import {CrudActions} from "../reusable/CrudActions";
import {EntityAction} from "../reusable/EntityAction";

// @ts-ignore
@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html'
})
export class OrganizationsComponent extends CrudActions implements OnInit {
  organizationForm = organizationForm as IForm;

  displayedColumns: string[] = [
    'id',
    'name',
    //'logoImageUrl',
    'location',
    'entityStatus',
    'action',
  ];

  tableHeading: string = "Organizations";
  tableData: any[] = [];


  constructor(http: HttpClient, dialog: MatDialog) {
    super(dialog, http); // Pass dependencies to the parent class
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getOrganizations()
  }

  // Fetch schools from the backend
  getOrganizations() {
    let entity: EntityAction = {
      name: 'organizations',
      id: '',
      data: ''
    };
    this.getRecord(entity).subscribe((response) => {
      this.tableData = response
    });
    console.log("Received table data", this.tableData);
  }

  addOrganization(request: any): void {
    let entity: EntityAction = {
      name: 'organizations',
      id: '',
      data: request
    };

    this.addRecord(entity).subscribe({
      next: (res) => {
        this.handleApiRecordResponse(
          res,
          entity,
          SchoolViewComponent
        );
      },
      error: (error) => {
        this.handleApiRecordError(
          error,
          'An error occurred creating the organization: '.concat(request.name),
          SchoolViewComponent
        );
      },
    });
  }


  addOrganization1(request: any): any {


    /**
     updateOrganization(id: string, request: any): void {
     this.getOrganizations(); // Refresh the list after successful update

     this.http.patch(environment.apiUrl.concat(`organizations/${id}`), request)
     .subscribe({
     next: (res: any) => {
     const dialogRef = this.dialog.open(SchoolViewComponent, {
     data: {
     action: 'Notification',
     local_data: res,
     message: 'Updated organization successfully: '.concat(id),
     },
     });
     console.log("Updated organizations:", res);
     this.getOrganizations(); // Refresh the list after successful update
     },
     error: (error: any) => {
     console.error("Error updating organization:", error);
     // Handle error appropriately
     const dialogRef = this.dialog.open(SchoolViewComponent, {
     data: {
     action: 'Notification',
     local_data: error,
     message: 'An error occurred updating the organization: '.concat(id),
     },
     });
     }
     });
     }
     */
  }

  onViewItem(record: any) {
    console.log("Viewing an organization");
    // Prepare form with populated values
    const populatedForm = this.prepareFormWithData(record);

    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View',
        formInput: populatedForm,
        readOnly: true
      },
    });
  }

  onAddItem(record: any) {
    console.log("Adding an organization ...")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Add',
        organizationData: record,
        formInput: organizationForm
      }, // Pass relevant data
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log("Creation value from organization View:", result);
        // Create organization
        if (result.action === 'Add') {
          this.addOrganization(result.data);
        }
      }
    });
  }


  onUpdateItem(record: any) {
    console.log("Updating an organization")
    const populatedForm = this.prepareFormWithData(record);

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
          //this.updateOrganization(record.id, updateData);
        }
      }
    });
  }


  // Helper method to populate form with existing data
  private prepareFormWithData(record: any): IForm {
    const populatedForm = {...this.organizationForm};
    populatedForm.formControls = populatedForm.formControls.map(control => ({
      ...control,
      value: record[control.name] ?? control.value
    }));
    return populatedForm;
  }

  onDeleteItem(record: any) {
    console.log("Deleting an organisation");

    const dialogRef = this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Delete',
        local_data: record,
        errorMessage: 'Are you sure you want to delete the organization '.concat(record.name),
        message: ''
      },
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result?.event === 'Delete') {
    //     this.deleteOrganisation(record.id).subscribe(
    //       response => {
    //         console.log('Organisation deleted successfully', response);
    //         const dialogRef = this.dialog.open(SchoolViewComponent, {
    //           data: {
    //             action: 'Notification',
    //             local_data: response,
    //             message: 'Deleted organization successfully: '.concat(record.name),
    //           },
    //         });
    //       },
    //       error => {
    //         console.error('Error deleting organisation', error);
    //         const dialogRef = this.dialog.open(SchoolViewComponent, {
    //           data: {
    //             action: 'Notification',
    //             local_data: error,
    //             message: 'An error occurred deleting organization: '.concat(record.name),
    //           },
    //         });
    //         // Update the dialog data with the error message
    //         //dialogRef.componentInstance.local_data.errorMessage = error.error?.message || 'An error occurred while deleting the organisation.';
    //         // Trigger change detection manually
    //         //dialogRef.componentInstance.dialogRef.updateSize(); // Optional: adjust dialog size if necessary
    //       }
    //     );
    //   }
    // });
  }

  // Filter records
  onFilterValue(record: any) {
    console.log("Filtering records of organizations: ", record);
    // this.http.get(environment.apiUrl.concat("organizations?name.contains=" + record))
    // .subscribe((res: any) => {
    //   this.tableData = res
    //   console.log("Getting organization data: {}", res)
    // })
  }

  // onCreationValue(record: any) {
  //   console.log("Creating an organization: " + record)
  // }

  deleteOrganisation(id: string) {
    //return this.http.delete(environment.apiUrl.concat(`organizations/${id}`));
  }


}
