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
import {HttpClient, HttpEventType} from "@angular/common/http";
import {UploadService} from "../../../../services/upload.service";
import {environment} from "../../../../../../environment";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  standalone: false
})
export class DynamicFormComponent implements OnInit {
  @Output() onCreationValue = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();
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
  get mapHeight(): string { return window.innerWidth < 600 ? '250px' : '500px'; }
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 8,
  };
  get markerOptions(): google.maps.MarkerOptions {
    return { draggable: !this.readOnly };
  }
  markerPosition!: google.maps.LatLngLiteral;
  placeName: string = '';
  placeAddress: string = '';

  private autocomplete!: google.maps.places.Autocomplete;

  uploadProgress: { [controlName: string]: number } = {};

  // ================

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private uploadService: UploadService,
    private http: HttpClient
  ) {
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

    // Bug 2 fix: pre-populate map center/marker from stored lat/lng on View/Update
    const mapCtrl = this.form.formControls.find(c => c.type === 'map');
    if (mapCtrl?.latitudeField && mapCtrl?.longitudeField) {
      const lat = parseFloat(this.dynamicFormGroup.get(mapCtrl.latitudeField)?.value);
      const lng = parseFloat(this.dynamicFormGroup.get(mapCtrl.longitudeField)?.value);
      if (!isNaN(lat) && !isNaN(lng)) {
        this.center = { lat, lng };
        this.markerPosition = { lat, lng };
      }
    }

    // Fetch options for any relation select fields
    this.form.formControls
      .filter(c => c.apiEndpoint)
      .forEach(control => {
        this.http.get<any[]>(environment.apiUrl + control.apiEndpoint + '?page=0&size=100')
          .subscribe(items => {
            control.options = items.map(item => ({
              label: item[control.optionLabel!],
              value: item[control.optionValue!]
            }));
          });
      });
  }

  onSubmit() {
    if (this.dynamicFormGroup.valid) {
      const raw = this.dynamicFormGroup.value;
      const formValues: any = {};

      this.form.formControls.forEach(control => {
        const val = raw[control.name];
        if (control.isRelation && val !== null && val !== undefined && val !== '') {
          formValues[control.name] = { id: val };
        } else {
          formValues[control.name] = val;
        }
      });

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
    if (!fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, JPG, PNG)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must not exceed 10 MB');
      return;
    }

    this.uploadProgress[controlName] = 0;
    this.dynamicFormGroup.get(controlName)?.setValue('');

    this.uploadService.upload(file).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress[controlName] = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          const url = (event.body as any)?.url;
          this.dynamicFormGroup.get(controlName)?.setValue(url);
          delete this.uploadProgress[controlName];
        }
      },
      error: (err) => {
        delete this.uploadProgress[controlName];
        alert('Upload failed. Please try again.');
        console.error('Upload error:', err);
      }
    });
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

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/images/profile/user-avatar.png';
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

            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            this.center = { lat, lng };
            this.markerPosition = this.center;

            // Bug 1 fix: write coordinates into the form controls
            const mapCtrl = this.form.formControls.find(c => c.type === 'map');
            if (mapCtrl?.latitudeField)  this.dynamicFormGroup.get(mapCtrl.latitudeField)?.setValue(lat.toString());
            if (mapCtrl?.longitudeField) this.dynamicFormGroup.get(mapCtrl.longitudeField)?.setValue(lng.toString());

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
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      this.markerPosition = { lat, lng };

      // Bug 1 fix: keep form controls in sync when marker is dragged
      const mapCtrl = this.form.formControls.find(c => c.type === 'map');
      if (mapCtrl?.latitudeField)  this.dynamicFormGroup.get(mapCtrl.latitudeField)?.setValue(lat.toString());
      if (mapCtrl?.longitudeField) this.dynamicFormGroup.get(mapCtrl.longitudeField)?.setValue(lng.toString());
    }
  }
}
