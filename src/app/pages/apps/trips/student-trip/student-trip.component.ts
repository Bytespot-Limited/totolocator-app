import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-student-trip',
  templateUrl: './student-trip.component.html'
})
export class StudentTripComponent implements OnInit {
  actionPojo = {
    id: 1,
    status: ''
  }
  students: any[] = [];
  id: any;

  searchText: any;


  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
  }

  // Lifecycle event to execute the api calls
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');  // Use '+' to convert the parameter to a number if needed
      console.log('Received ID:', this.id);
    });
    this.getStudentsOnTrip(this.id)
  }

  // Get students on the given trip
  getStudentsOnTrip(tripId: number) {
    this.http.get("https://harmony-api-d3c63c482f2e.herokuapp.com/api/student-trips?tripId.equals=" + tripId + "&page=0&size=20")
    .subscribe((res: any) => {
      console.log("Getting students in the trip data: {}", res)
      this.students = res;
    })


  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.students = this.filter(filterValue);
  }

  filter(v: string): void {
    // return this.contactService
    // .getContacts()
    // .filter(
    //   (x) => x.contactname.toLowerCase().indexOf(v.toLowerCase()) !== -1
    // );
  }

  // Process the incoming user action
  actionStudentTrip(action: string, record: any) {
    if (action === 'pickup') {
      console.log("Picking up student: ", record.student.name);
      this.updateStudentOnTrip(record.id, 'BOARDED');


    } else if (action === 'drop_off') {
      console.log("Dropping of student: ", record.student.name)
      this.updateStudentOnTrip(record.id, 'DROPPED_OFF');

    }


  }

// Update student trip i.e pickup of drop off
  updateStudentOnTrip(tripId: number, status: string) {
    this.actionPojo = {
      id: tripId,
      status: status
    };
    this.openDialog(status);
  }


  openDialog(status: string): void {
    var title: string = '';
    var question: string = '';

    if (status === 'BOARDED') {
      title = 'Student Pickup';
      question = 'Confirm you want to pick up student?'
    } else if (status === 'DROPPED_OFF') {
      title = 'Student Drop off';
      question = 'Confirm you want to drop off student?'

    }
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: title,
        question: question
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Confirm') {
        console.log("Confirmed update of student trip.")
        this.http.patch("http://localhost:8080/api/student-trips/" + this.actionPojo.id, this.actionPojo)
        .subscribe((res: any) => {
          console.log("Updated the student trip: {}", res);
          this.getStudentsOnTrip(this.id)
        })
      } else if (result.event === 'Cancel') {
        console.log("Cancel update of student trip.")
      }
    });
  }

}

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html'
})
export class DialogBoxComponent {

  title: string;
  action: string;


  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }

  doAction(): void {
    this.dialogRef.close({event: 'Confirm'});
  }

  closeDialog(): void {
    this.dialogRef.close({event: 'Cancel'});
  }

}

