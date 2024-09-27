import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {SchoolViewComponent} from "../schools/school-view/school-view.component";
import {Router} from "@angular/router";

/**
 *   {
 *     "id": 0,
 *     "devideId": "string",
 *     "phoneNumber": "string",
 *     "manufacturer": "string",
 *     "model": "string",
 *     "lastPing": "2023-12-02T14:43:21.421Z",
 *     "longitude": "string",
 *     "latitude": "string",
 *     "status": "ONLINE",
 *     "entityStatus": "ACTIVE",
 *     "creationDate": "2023-12-02T14:43:21.421Z",
 *     "modifiedDate": "2023-12-02T14:43:21.421Z"
 *   }
 */
@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html'
})
export class TerminalsComponent {
  displayedColumns: string[] = [
    'devideId',
    'status',
    'phoneNumber',
    'lastPing',
    'entityStatus',
    'creationDate',
    'action',
  ];
  tableHeading: string = "Terminals";
  tableData: any[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient, private router: Router) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getTerminals()
  }

  // Fetch schools from the backend
  getTerminals() {
    this.http.get("https://harmony-api-d3c63c482f2e.herokuapp.com/api/terminals?page=0&size=20")
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting school stuff data: {}", res)
    })
  }

  onViewItem(record: any) {
    console.log("Viewing a terminal: {}", record)
    this.navigateToComponent(record.id)
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
    console.log("Filtering records of terminals: ", record);
    this.http.get("http://localhost:8080/api/terminals?devideId.contains=" + record)
    .subscribe((res: any) => {
      this.tableData = res
      console.log("Getting terminals data: {}", res)
    })
  }

  navigateToComponent(id: number) {
    this.router.navigate(['apps/terminals', id]);
  }

}
