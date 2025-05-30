import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {IForm} from "../../forms/interfaces/IForm";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {FormControls} from "../../forms/interfaces/form-controls";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: false
})
export class DynamicFormComponent implements OnInit {
  @Output() onCreationValue = new EventEmitter<any>();
  @Input() form!: IForm;
  @Input() readOnly: boolean = false;  // Uncommented and properly declared
  dynamicFormGroup: FormGroup;

  // ====================
  @ViewChild('search') public searchElementRef!: ElementRef;
  @ViewChild(GoogleMap) public map!: GoogleMap;
  @ViewChild(MapInfoWindow) public infoWindow!: MapInfoWindow;
  @ViewChild('placeMarker') public markerRef!: MapMarker;


  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 8,
  };
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPosition!: google.maps.LatLngLiteral;
  placeName: string = '';
  placeAddress: string = '';

  private autocomplete!: google.maps.places.Autocomplete;

  // ================

  constructor(private fb: FormBuilder, private ngZone: NgZone) {
    this.dynamicFormGroup = fb.group({}, {updateOn: 'submit'});
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
    this.center = {lat: -1.286389, lng: 36.817223};
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

      return finalAge < minAge ? {'minAge': {value: control.value}} : null;
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

  /**
   * Map functionality
   */

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit started.');

    // 1. Verify searchElementRef is present and is an input element
    if (!this.searchElementRef || !(this.searchElementRef.nativeElement instanceof HTMLInputElement)) {
      console.error('ERROR: searchElementRef is not a valid HTML input element:', this.searchElementRef);
      return;
    }
    console.log('Search element reference obtained:', this.searchElementRef.nativeElement);

    // 2. Verify Google Maps API and Places library are loaded
    if (typeof google === 'undefined' || typeof google.maps === 'undefined' || typeof google.maps.places === 'undefined') {
      console.error('ERROR: Google Maps API or Places library not loaded at the time of ngAfterViewInit!');
      console.log('google object:', typeof google !== 'undefined' ? google : 'undefined');
      console.log('google.maps object:', typeof google !== 'undefined' && typeof google.maps !== 'undefined' ? google.maps : 'undefined');
      console.log('google.maps.places object:', typeof google !== 'undefined' && typeof google.maps !== 'undefined' && typeof google.maps.places !== 'undefined' ? google.maps.places : 'undefined');
      // You might need a small delay here if the script is still parsing/executing
      setTimeout(() => this.ngAfterViewInit(), 500); // Retry after 500ms if not loaded
      return;
    }
    console.log('Google Maps API and Places library confirmed loaded.');


    // 3. Initialize Autocomplete (ONLY if everything above checks out)
    this.ngZone.runOutsideAngular(() => {
      try {
        console.log('Attempting to initialize Autocomplete...');
        this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ['geocode', 'establishment'],
          fields: ['address_components', 'formatted_address', 'geometry', 'name'],
        });
        console.log('Autocomplete initialized successfully:', this.autocomplete);

        this.autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
            console.log('Place changed event triggered:', place);

            if (!place.geometry || !place.geometry.location) {
              console.error("Returned place contains no geometry");
              return;
            }

            this.placeName = place.name || '';
            this.placeAddress = place.formatted_address || '';

            this.center = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            this.markerPosition = this.center;

            if (place.geometry.viewport) {
              this.map.fitBounds(place.geometry.viewport);
            } else {
              this.zoom = 17;
            }

            setTimeout(() => {
              this.openInfoWindow();
            }, 0);
          });
        });
      } catch (e) {
        console.error('Error initializing Google Places Autocomplete:', e);
      }
    });
  }

  openInfoWindow() {
    if (this.infoWindow && this.markerRef) {
      this.infoWindow.open(this.markerRef);
    }
  }

  // **THE FIX IS HERE:** Change type from google.maps.MouseEvent to google.maps.MapMouseEvent
  markerDragged(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      // ... (optional: reverse geocode the new position if you want to update placeName/Address after drag)
    }
  }
}
