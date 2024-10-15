import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IForm } from "../../forms/interfaces/IForm";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { FormControls } from "../../forms/interfaces/form-controls";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent {
  @Output() onCreationValue = new EventEmitter<any>();

  @Input() form!: IForm;
  dynamicFormGroup: FormGroup;
  browserTime: string;

  constructor(private fb: FormBuilder) {
    console.log("Received form input:", this.form);
    this.dynamicFormGroup = fb.group({}, { updateOn: 'submit' });
  }

  ngOnInit(): void {
    if (this.form?.formControls) {
      const formGroup: any = {};
      this.form.formControls.forEach((control: any) => {
        const controlValidators: any = [];
        if (control.validators) {
          control.validators.forEach((val: any) => {
            if (val.validatorName === 'required') controlValidators.push(Validators.required);
            if (val.validatorName === 'email') controlValidators.push(Validators.email);
            if (val.validatorName === 'minlength') controlValidators.push(Validators.minLength(val.minLength));
            if (val.validatorName === 'pattern') controlValidators.push(Validators.pattern(val.pattern));
            if (val.validatorName === 'maxlength') controlValidators.push(Validators.maxLength(val.maxLength));
          });
        }
        formGroup[control.name] = [control.value || '', controlValidators];
      });
      this.dynamicFormGroup = this.fb.group(formGroup);
    }
  }

  onSubmit() {
    if (this.dynamicFormGroup.valid) {
      console.log('Form values:', this.dynamicFormGroup.value);
      const formValues = this.dynamicFormGroup.value;
      this.onCreationValue.emit(formValues);
    }
  }


  // Implement validation error message handling here
  resetForm() {
    this.dynamicFormGroup.reset();
  }

  setBrowserTime(controlName: string) {
    const currentTime = new Date();

    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentTime.getDate()).padStart(2, '0');
    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = '00';

    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    this.dynamicFormGroup.get(controlName)?.setValue(formattedDateTime);
}


  getErrorMessage(control: FormControls): string {
    const myFormControl = this.dynamicFormGroup.get(control.name);
    let errorMessage = '';
    control.validators.forEach((val) => {

      if (myFormControl?.hasError(val.validatorName as string)) {
        errorMessage = val.message as string;
      }
    });

    return errorMessage;
  }
}
