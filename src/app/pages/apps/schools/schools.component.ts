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

  // Get school record to edit
  editSchool(data: any) {
    //debugger

  }


  onViewItem(record: any) {
    console.log("Viewing a school")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View',
        formInput: schoolForm
      },
    });
  }

  onAddItem(record: any) {
    console.log("Adding a school")
    this.dialog.open(SchoolViewComponent, {
      data: {
        action: 'View', 
        schoolData: record,
        formInput: schoolForm
      }, // Pass relevant data
    }).afterClosed().subscribe(result => {
      if (result) { // Check if dialog closed with a value
        console.log("Creation value from School View:", result);
        // Use the received value (result) here
        if (result.action === 'Add'){
          this.addSchool(result.data);
        }
      }
    });
  }

  onUpdateItem(record: any) {
    console.log("Updating a school")
    this.dialog.open(SchoolViewComponent),{
      data: {
        action: 'Update',
        formInput: schoolForm
      }
    };
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
