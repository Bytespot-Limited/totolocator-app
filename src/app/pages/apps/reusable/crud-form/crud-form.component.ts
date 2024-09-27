import { Component, Inject, Input, Output, Optional, EventEmitter } from '@angular/core';
import { DatePipe } from "@angular/common";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormInput } from './FormInput';

@Component({
  selector: 'app-crud-form',
  templateUrl: './crud-form.component.html'
})
export class CrudFormComponent {
  // Methods used to pass data from the parent to the child component
  @Input() editable: boolean;
  @Input() formHeading: string;
  @Input() inputFields: FormInput[] = [];


  // Methods used to pass data from the child to the parent component
  //@Output() onFilterValue = new EventEmitter<any>();


  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<CrudFormComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,

  ) {

  }

  doAction(): void {
    //this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      //this.local_data.imagePath = reader.result;
    };
  }

}
