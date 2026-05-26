import {IForm} from "./interfaces/IForm";

export const tripForm: IForm = {
  formTitle: 'Trip',
  saveBtnTitle: 'Save Trip',
  resetBtnTitle: 'Cancel',
  displayColumns: [
    'tripType',
    'tripStatus',
    'startTime',
    'endTime',
    'action',
  ],
  formControls: [
    {
      "name": "tripType",
      "label": "Trip Type",
      "value": "",
      "placeholder": "Select Trip Type",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "displayInput": true,
      "options": [
        {"label": "Dropoff", "value": "DROPOFF"},
        {"label": "Field Trip", "value": "FIELDTRIP"},
        {"label": "Pickup", "value": "PICKUP"}
      ],
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Trip type is required."
        }
      ]
    }
  ]
}
