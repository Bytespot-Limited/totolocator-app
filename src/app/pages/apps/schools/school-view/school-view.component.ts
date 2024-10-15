import { Component, EventEmitter, Inject, Optional, Output } from '@angular/core';
import { DatePipe } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { IForm } from "../../forms/interfaces/IForm";

@Component({
  selector: 'app-school-view',
  templateUrl: './school-view.component.html',
})
export class SchoolViewComponent {
  @Output() creationValueEvent = new EventEmitter<any>();
  formInput: IForm;
  action: string;
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<SchoolViewComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.formInput = this.local_data.formInput;

    // Handle joining date
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd',
      );
    }
    // Default image path
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/profile/user-1.jpg';
    }
  }

  doAction(): void {
    if (this.action === 'Delete') {
      this.dialogRef.close({ event: 'Delete', data: this.local_data });
    } else {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  // Handle file selection
  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.local_data.imagePath = reader.result;
    };
  }

  onCreationValue(event: any) {
    this.dialogRef.close({ action: 'Add', data: event });
  }
}
