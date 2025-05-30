import {Validators} from "./validators";

export interface FormControls {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  class: string;
  type: string;
  validators: Validators[];
  options?: { label: string, value: string }[];
  minAge?: number;
  displayInput?: boolean;
}
