import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SchoolViewComponent } from "./school-view/school-view.component";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "../../../../../environment";
import { IForm } from '../forms/interfaces/IForm';
import { FormInput } from '../reusable/crud-form/FormInput';
import { schoolForm } from '../forms/school-registration-form-config';


@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
})
export class SchoolsComponent implements OnInit {
  schoolForm = schoolForm as IForm;

  displayedColumns: string[] = [
    'id',
    'name',
    'logoImageUrl',
    'location',
    'entityStatus',
    'action',
  ];

  tableHeading: string = "School";
  tableData: any[] = [];


  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getSchools()
    // this.tableData = employees
  }

  // Fetch schools from the backend
  getSchools() {
    this.http.get(environment.apiUrl.concat("schools?page=0&size=20"))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting schools data: {}", res)
      })
  }

  addSchool(request: any): any {
    this.http.post(environment.apiUrl.concat("schools"), request)
      .subscribe((res: any) => {
        var school = res
        console.log("Added school: {}", res)
        return school;
      })
  }

  updateSchool(id: string, request: any): void {  
    this.http.put(environment.apiUrl.concat(`schools/${id}`), request)
      .subscribe({
        next: (res: any) => {
          console.log("Updated school:", res);
          this.getSchools(); // Refresh the list after successful update
        },
        error: (error: any) => {
          console.error("Error updating school:", error);
          // Handle error appropriately
        }
      });
  }

  onViewItem(record: any) {
    console.log("Viewing a school");
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
    console.log("Adding a school")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Add',
        schoolData: record,
        formInput: schoolForm
      }, // Pass relevant data
    }).afterClosed().subscribe(result => {
      if (result) { // Check if dialog closed with a value
        console.log("Creation value from School View:", result);
        // Use the received value (result) here
        if (result.action === 'Add') {
          this.addSchool(result.data);
        }
      }
    });
  }

  onUpdateItem(record: any) {
    console.log("Updating a school");
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
            id: record.id  // Ensure ID is preserved
          };
          this.updateSchool(record.id, updateData);
        }
      }
    });
  }

  // Helper method to populate form with existing data
  private prepareFormWithData(record: any): IForm {
    const populatedForm = { ...this.schoolForm };
    populatedForm.formControls = populatedForm.formControls.map(control => ({
      ...control,
      value: record[control.name] ?? control.value
    }));
    return populatedForm;
  }


  onDeleteItem(record: any) {
    console.log("Deleting a school")
    const dialogRef = this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'Delete',
        local_data: record,
        errorMessage: ''
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.event === 'Delete') {
        this.deleteSchool(record.id).subscribe(
          response => {
            console.log('School deleted successfully', response);
          },
          error => {
            console.error('Error deleting school', error);
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
    console.log("Filtering records of schools: ", record);
    this.http.get(environment.apiUrl.concat("schools?name.contains=" + record))
      .subscribe((res: any) => {
        this.tableData = res
        console.log("Getting schools data: {}", res)
      })
  }

  // Get school record to delete
  deleteSchool(id: string) {
    return this.http.delete(environment.apiUrl.concat(`schools/${id}`));
  }

}
