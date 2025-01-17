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
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "^[a-zA-Z0-9\\s]+$",
          "message": "Number plate should have number and text only"
        },
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Student name is Required"
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
          "message": "Entity status is Required"
        }
      ]
    }
  ]
}
