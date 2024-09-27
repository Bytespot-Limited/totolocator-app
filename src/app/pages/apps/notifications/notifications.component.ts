import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {SchoolViewComponent} from "../schools/school-view/school-view.component";

/**
 *  {
 *     "id": 0,
 *     "channel": "SMS",
 *     "channelId": "string",
 *     "message": "string",
 *     "errorMessage": "string",
 *     "status": "SENT",
 *     "creationDate": "2023-12-02T15:04:57.060Z"
 *   }
 */
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
  displayedColumns: string[] = [
    'id',
    'channel',
    'message',
    'status',
    'creationDate',
    'action',
  ];
  tableHeading: string = "Notifications";
  tableData: any[] = [];

  constructor(public dialog: MatDialog, private http: HttpClient) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.getNotifications()
    // this.tableData = employees
  }

  // Fetch schools from the backend
  getNotifications() {
    this.http.get("https://harmony-api-d3c63c482f2e.herokuapp.com/api/notifications?page=0&size=20")
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
}
