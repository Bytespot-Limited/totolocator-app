import {
  AfterViewInit,
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

declare const google: any; // Keep this for global google object

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: false
})
export class DynamicFormComponent implements OnInit, AfterViewInit { // Ensure AfterViewInit is implemented
  @Output() onCreationValue = new EventEmitter<any>();
  @Output() onMapValue = new EventEmitter<any>();


  @Input() form!: IForm;
  @Input() readOnly: boolean = false;
  dynamicFormGroup: FormGroup;

  // Google Maps Properties
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
  markerOptions: google.maps.MarkerOptions = {draggable: true};
  markerPosition!: google.maps.LatLngLiteral;
  placeName: string = '';
  placeAddress: string = '';

  private autocomplete!: google.maps.places.Autocomplete;
  private geocoder!: google.maps.Geocoder; // Declare Geocoder

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
    // Set default center for the map
    if (this.dynamicFormGroup.get("longitude")?.value != null) {
      console.log("Coordinates are available: ....")
      this.center = {
        lat: +this.dynamicFormGroup.get("latitude")?.value,
        lng: +this.dynamicFormGroup.get("longitude")?.value
      }; // Nairobi, Kenya
      this.markerPosition = this.center;
      console.log("Coordinates are available: ....", this.markerPosition, this.center);
    } else {
      this.center = {lat: -1.286389, lng: 36.817223}; // Nairobi, Kenya
    }
  }

  onSubmit() {
    if (this.dynamicFormGroup.valid) {
      this.dynamicFormGroup.get("longitude")?.setValue(this.markerPosition.lng);
      this.dynamicFormGroup.get("latitude")?.setValue(this.markerPosition.lat);

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

  /**
   * Custom validator for minimum age.
   */
  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) return null; // If no value, no validation error
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
   * Map Functionality
   *
   *  the following methods handle the Google Maps, Places Autocomplete, and Geocoding interactions.
   */


  ngAfterViewInit(): void {
    console.log('ngAfterViewInit started.');

    // 1. Verify searchElementRef is present and is an input element
    if (!this.searchElementRef || !(this.searchElementRef.nativeElement instanceof HTMLInputElement)) {
      console.error('ERROR: searchElementRef is not a valid HTML input element:', this.searchElementRef);
      return;
    }
    console.log('Search element reference obtained:', this.searchElementRef.nativeElement);

    // 2. Verify Google Maps API and Places/Geocoder libraries are loaded
    if (typeof google === 'undefined' || typeof google.maps === 'undefined' || typeof google.maps.places === 'undefined' || typeof google.maps.Geocoder === 'undefined') {
      console.error('ERROR: Google Maps API or necessary libraries not loaded at the time of ngAfterViewInit!');
      console.log('google object:', typeof google !== 'undefined' ? google : 'undefined');
      console.log('google.maps object:', typeof google !== 'undefined' && typeof google.maps !== 'undefined' ? google.maps : 'undefined');
      console.log('google.maps.places object:', typeof google !== 'undefined' && typeof google.maps !== 'undefined' && typeof google.maps.places !== 'undefined' ? google.maps.places : 'undefined');
      console.log('google.maps.Geocoder object:', typeof google !== 'undefined' && typeof google.maps !== 'undefined' && typeof google.maps.Geocoder !== 'undefined' ? google.maps.Geocoder : 'undefined');

      // Retry after a short delay if the API isn't fully loaded yet
      setTimeout(() => this.ngAfterViewInit(), 500);
      return;
    }
    console.log('Google Maps API and Places/Geocoder libraries confirmed loaded.');

    // Initialize Geocoder here, after confirming google.maps.Geocoder is available
    this.geocoder = new google.maps.Geocoder();
    // In ngAfterViewInit, after this.geocoder = new google.maps.Geocoder();
    console.log('Geocoder instance:', this.geocoder);

    this.ngZone.runOutsideAngular(() => {
      try {
        console.log('Attempting to initialize Autocomplete...');
        this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ['geocode', 'establishment'],
          fields: ['address_components', 'formatted_address', 'geometry', 'name'],
        });
        console.log('Autocomplete initialized successfully:', this.autocomplete);

        // Listen for place selection from the autocomplete dropdown
        this.autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
            console.log('Place changed event triggered (from autocomplete):', place);
            this.updatePlaceDetails(place); // Update map and input with selected place
          });
        });
      } catch (e) {
        console.error('Error initializing Google Places Autocomplete:', e);
      }
    });
  }

  /**
   * Updates map properties and input field based on a given PlaceResult.
   */
  updatePlaceDetails(place: google.maps.places.PlaceResult) {
    if (!place.geometry || !place.geometry.location) {
      console.error("Returned place contains no geometry");
      // Optionally clear existing place details if no geometry is found
      this.placeName = '';
      this.placeAddress = '';
      const mapControlName = this.getMapControlName();
      if (mapControlName) {
        this.dynamicFormGroup.get(mapControlName)?.setValue('');
      }
      return;
    }

    this.placeName = place.name || '';
    this.placeAddress = place.formatted_address || '';

    // Update the form control's value, which in turn updates the input field
    const mapControlName = this.getMapControlName();
    if (mapControlName) {
      this.dynamicFormGroup.get(mapControlName)?.setValue(this.placeAddress);
    }
    this.center = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    this.markerPosition = this.center;

    if (place.geometry.viewport) {
      this.map.fitBounds(place.geometry.viewport);
    } else {
      this.zoom = 17; // Default zoom if no viewport is provided
    }

    // Open info window after a slight delay to ensure map/marker rendering
    setTimeout(() => {
      this.openInfoWindow();
    }, 0);
  }

  /**
   * Opens the info window anchored to the marker.
   */
  openInfoWindow() {
    if (this.infoWindow && this.markerRef) {
      this.infoWindow.open(this.markerRef);
    }
  }

  /**
   * Handles marker drag events, performing reverse geocoding to update the address.
   */
  markerDragged(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.ngZone.run(() => {
        this.geocoder.geocode({'location': this.markerPosition}, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const placeResult: google.maps.places.PlaceResult = results[0];
            console.log('Reverse geocoded place:', placeResult);
            this.updatePlaceDetails(placeResult);
          } else {
            console.error('Geocoder failed due to: ' + status);
            this.placeName = 'Unknown Location';
            this.placeAddress = `Lat: ${this.markerPosition.lat}, Lng: ${this.markerPosition.lng}`;

            // FIX 3: Check if getMapControlName() returns a valid string
            const mapControlName = this.getMapControlName();
            if (mapControlName) {
              this.dynamicFormGroup.get(mapControlName)?.setValue(this.placeAddress);
            }
            this.infoWindow.close();
          }
        });
      });
    }
  }

  /**
   * Helper to retrieve the name of the form control associated with the map input.
   * Assumes there's a control in `this.form.formControls` with `type === 'map'`.
   */
  getMapControlName(): string | undefined {
    const mapControl = this.form.formControls.find(control => control.type === 'map');
    return mapControl ? mapControl.name : undefined;
  }
}
