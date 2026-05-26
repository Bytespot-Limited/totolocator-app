import {Validators} from "./validators";

export interface FormControls {
  name: string;
  label: string;
  value: any;
  placeholder: string;
  class: string;
  type: string;
  validators: Validators[];
  options?: { label: string, value: any }[];
  minAge?: number;
  displayInput?: boolean;
  apiEndpoint?: string;
  optionLabel?: string;
  optionValue?: string;
  isRelation?: boolean;
  latitudeField?: string;
  longitudeField?: string;
}
