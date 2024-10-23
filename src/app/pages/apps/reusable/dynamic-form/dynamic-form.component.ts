import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IForm } from "../../forms/interfaces/IForm";
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { FormControls } from "../../forms/interfaces/form-controls";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
  @Output() onCreationValue = new EventEmitter<any>();
  @Input() form!: IForm;
  @Input() readOnly: boolean = false;  // Uncommented and properly declared
  dynamicFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dynamicFormGroup = fb.group({}, { updateOn: 'submit' });
  }

  ngOnInit(): void {
    console.log("Received form input:", this.form);
    if (this.form?.formControls) {
      const formGroup: any = {};
      this.form.formControls.forEach((control: any) => {
        const controlValidators: any = [];

        // Add validators based on the control definition
        if (!this.readOnly && control.validators) {
          control.validators.forEach((val: any) => {
            if (val.validatorName === 'required') controlValidators.push(Validators.required);
            if (val.validatorName === 'email') controlValidators.push(Validators.email);
            if (val.validatorName === 'minlength') controlValidators.push(Validators.minLength(val.minLength));
            if (val.validatorName === 'pattern') controlValidators.push(Validators.pattern(val.pattern));
            if (val.validatorName === 'maxlength') controlValidators.push(Validators.maxLength(val.maxLength));
            if (val.validatorName === 'minAge' && val.minAge) {
              controlValidators.push(this.minAgeValidator(val.minAge));
            }
          });
        }

        formGroup[control.name] = [{
          value: control.value || '',
          disabled: this.readOnly
        }, controlValidators];
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

  resetForm() {
    this.dynamicFormGroup.reset();
  }

  setBrowserTime(controlName: string) {
    const currentTime = new Date();
    const formattedDateTime = currentTime.toISOString().slice(0, 16);
    this.dynamicFormGroup.get(controlName)?.setValue(formattedDateTime);
  }

  onFileSelected(event: Event, controlName: string) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPEG, JPG, PNG)');
        return;
      }

      const maxSizeInMB = 5;
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert(`File size must not exceed ${maxSizeInMB} MB`);
        return;
      }

      this.dynamicFormGroup.get(controlName)?.setValue(file.name);
      console.log('Selected file:', file.name);
    }
  }

  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null;
      const dateOfBirth = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - dateOfBirth.getFullYear();
      const isBirthdayPassed = today.getMonth() > dateOfBirth.getMonth() || 
        (today.getMonth() === dateOfBirth.getMonth() && today.getDate() >= dateOfBirth.getDate());
      const finalAge = isBirthdayPassed ? age : age - 1;

      return finalAge < minAge ? { 'minAge': { value: control.value } } : null;
    };
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