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
    'entityStatus',
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
    },
    {
      "name": "tripStatus",
      "label": "Trip Status",
      "value": "",
      "placeholder": "Select Trip Status",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "displayInput": true,
      "options": [
        {"label": "Started", "value": "STARTED"},
        {"label": "Ongoing", "value": "ONGOING"},
        {"label": "Completed", "value": "COMPLETED"}
      ],
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Trip status is required."
        }
      ]
    },
    {
      "name": "startTime",
      "label": "Start Time",
      "value": "",
      "placeholder": "YYYY-MM-DDTHH:MM",
      "class": "col-md-6",
      "type": "datetime-local",
      "displayInput": true,
      "validators": []
    },
    {
      "name": "endTime",
      "label": "End Time",
      "value": "",
      "placeholder": "YYYY-MM-DDTHH:MM",
      "class": "col-md-6",
      "type": "datetime-local",
      "displayInput": true,
      "validators": []
    },
    {
      "name": "driverId",
      "label": "Driver",
      "value": "",
      "placeholder": "Select Driver",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "displayInput": true,
      "options": [],
      "apiEndpoint": "drivers",
      "optionLabel": "name",
      "optionValue": "id",
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Driver is required."
        }
      ]
    }
  ]
}
