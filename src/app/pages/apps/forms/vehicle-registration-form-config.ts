import {IForm} from "./interfaces/IForm";

export const vehicleForm: IForm = {
  formTitle: 'Vehicle',
  saveBtnTitle: 'Save Vehicle',
  resetBtnTitle: 'Cancel',
  displayColumns: [
    'id',
    'numberPlate',
    //'logoImageUrl',
    'vehicleType',
    'entityStatus',
    'action',
  ],
  formControls: [
    {
      "name": "numberPlate",
      "label": "Vehicle Plate Number",
      "value": "",
      "placeholder": "e.g KDP 099Y",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "text",
      "displayInput": true,
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "^[a-zA-Z0-9\\s]+$",
          "message": "Number plate should contain numbers and letters only."
        },
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Number plate is required."
        }
      ]
    },
    {
      "name": "vehicleType",
      "label": "Vehicle Type",
      "value": "",
      "placeholder": "Select Vehicle Type",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "options": [
        {"label": "Bus", "value": "BUS"},
        {"label": "Van", "value": "VAN"}
      ],
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Vehicle type is required."
        }
      ]
    },
    {
      "name": "entityStatus",
      "label": "Status",
      "value": "",
      "placeholder": "Select Status",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "options": [
        {"label": "Active", "value": "ACTIVE"},
        {"label": "Inactive", "value": "INACTIVE"}
      ],
      "validators": []
    },
    {
      "name": "school",
      "label": "School",
      "value": "",
      "placeholder": "Select School",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "options": [],
      "apiEndpoint": "schools",
      "optionLabel": "name",
      "optionValue": "id",
      "isRelation": true,
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "School is required."
        }
      ]
    },
    {
      "name": "terminal",
      "label": "Terminal",
      "value": "",
      "placeholder": "Select Terminal",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "options": [],
      "apiEndpoint": "terminals",
      "optionLabel": "devideId",
      "optionValue": "id",
      "isRelation": true,
      "validators": []
    }
  ]
}
