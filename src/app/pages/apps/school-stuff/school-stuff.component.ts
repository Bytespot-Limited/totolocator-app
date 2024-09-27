import {Component} from '@angular/core';
import {SchoolViewComponent} from "../schools/school-view/school-view.component";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

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
export class SchoolStuffComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'profileImageUrl',
    'roleDescription',
    'entityStatus',
    'creationDate',
    'action',
  ];
  tableHeading: string = "School Stuff";
  tableData: any[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getSchoolStuff()
    // this.tableData = employees
  }

  // Fetch schools from the backend
  getSchoolStuff() {
    this.http.get("https://harmony-api-d3c63c482f2e.herokuapp.com/api/school-staffs?page=0&size=20")
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting school stuff data: {}", res)
    })
  }

  onViewItem(record: any) {
    console.log("Viewing a school")
    this.dialog.open(SchoolViewComponent, {
      data: {action: 'View'},
    });
  }

  onAddItem(record: any) {
    console.log("Adding a school")
    this.dialog.open(SchoolViewComponent);

  }

  onUpdateItem(record: any) {
    console.log("Updating a school")
    this.dialog.open(SchoolViewComponent);
  }

  onDeleteItem(record: any) {
    console.log("Deleting a school")
    this.dialog.open(SchoolViewComponent, {
      data: {action: 'Delete'},
    });
  }

  // Filter records
  onFilterValue(record: any) {
    console.log("Filtering records of schools stuff: ", record);
    this.http.get("http://localhost:8080/api/school-staffs?name.contains=" + record)
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting school staff data: {}", res)
    })
  }

}
