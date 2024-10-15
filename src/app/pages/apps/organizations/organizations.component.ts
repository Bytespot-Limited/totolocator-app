import {Component, OnInit} from '@angular/core';
import {SchoolViewComponent} from '../schools/school-view/school-view.component';
import {MatDialog} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {environment} from 'environment';
import {organizationForm} from "../forms/institution-registration-form-config";
import {IForm} from "../forms/interfaces/IForm";
import {Observable} from "rxjs";

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html'
})
export class OrganizationsComponent implements OnInit {
  organizationForm = organizationForm as IForm;

  displayedColumns: string[] = [
    'id',
    'name',
    'logoImageUrl',
    'location',
    'entityStatus',
    'action',
  ];

  tableHeading: string = "Organizations";
  tableData: any[] = [];


  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getOrganizations()
    // this.tableData = employees
  }

  // Fetch schools from the backend
  getOrganizations() {
    this.http.get(environment.apiUrl.concat("organizations?page=0&size=20"))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting organizations data: {}", res)
      })
  }

  createOrganization(request: any): any {
    this.http.post(environment.apiUrl.concat("organizations"), request)
      .subscribe((res: any) => {
        var organization = res
        console.log("Created organization: {}", res)
        return organization;
      })
  }

  // Get organizations record to edit
  editOrganizations(data: any) {
    //debugger

  }

  onViewItem(record: any) {
    console.log("Viewing a organization")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View',
        formInput: organizationForm
      },
    });
  }

  onAddItem(record: any) {
    console.log("Adding an organization ...")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Add',
        formInput: organizationForm
      }, // Pass relevant data
    }).afterClosed().subscribe(result => {
      console.log("Creation value from organization View:", result);
      // Create organization
      if (result.action === 'Add') {
        this.createOrganization(result.data);
      }
    });
  }

  onUpdateItem(record: any) {
    console.log("Updating a organization")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Update',
        formInput: organizationForm
      },
    });
  }

  onDeleteItem(record: any) {
    console.log("Deleting an organisation");

    const dialogRef = this.dialog.open(SchoolViewComponent, {
        data: {
            action: 'Delete',
            local_data: record,
            errorMessage: '' // Initialize errorMessage
        },
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result?.event === 'Delete') {
            this.deleteOrganisation(record.id).subscribe(
                response => {
                    console.log('Organisation deleted successfully', response);
                },
                error => {
                    console.error('Error deleting organisation', error);
                    // Update the dialog data with the error message
                    dialogRef.componentInstance.local_data.errorMessage = error.error?.message || 'An error occurred while deleting the organisation.';
                    // Trigger change detection manually
                    dialogRef.componentInstance.dialogRef.updateSize(); // Optional: adjust dialog size if necessary
                }
            );
        }
    });
}

  // Filter records
  onFilterValue(record: any) {
    console.log("Filtering records of organizations: ", record);
    this.http.get(environment.apiUrl.concat("organizations?name.contains=" + record))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting organization data: {}", res)
      })
  }

  onCreationValue(record: any) {
    console.log("Creating an organization: " + record)
  }

  deleteOrganisation(id: string) {
    return this.http.delete(environment.apiUrl.concat(`organizations/${id}`));
  }


}
