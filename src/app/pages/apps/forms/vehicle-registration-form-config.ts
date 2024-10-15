import { IForm } from "./interfaces/IForm";

export const vehicleForm: IForm = {
  formTitle: 'Vehicle Form',
  saveBtnTitle: 'Add Vehicle',
  resetBtnTitle: 'Cancel',
  formControls: [
    {
      "name": "name",
      "label": "Vehicle Plate Number",
      "value": "",
      "placeholder": "e.g KDP 099Y",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "text",
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "^[a-zA-Z0-9\\s]+$",
          "message": "Name should have only alphabet characters"
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
        { "label": "Bus", "value": "BUS" },
        { "label": "Van", "value": "VAN" }
      ],
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Entity status is Required"
        }
      ]
    },
    {
      "name": "entityStatus",
      "label": "Entity Status",
      "value": "",
      "placeholder": "Select Entity Status",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "options": [
        { "label": "Active", "value": "ACTIVE" },
        { "label": "Inactive", "value": "INACTIVE" }
      ],
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Entity status is Required"
        }
      ]
    },
    {
      "name": "creationDate",
      "label": "Date added",
      "value": "",
      "placeholder": "YYYY-MM-DDTHH:MM",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "datetime-local",
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Start time is Required"
        }
      ]
    }
  ]
}
