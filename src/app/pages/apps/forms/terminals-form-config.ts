import {IForm} from "./interfaces/IForm";

export const terminalForm: IForm = {
  formTitle: 'Terminal',
  saveBtnTitle: 'Save Terminal',
  resetBtnTitle: 'Cancel',
  displayColumns: [
    'id',
    'devideId',
    'phoneNumber',
    'status',
    'entityStatus',
    'action',
  ],
  formControls: [
    {
      "name": "devideId",
      "label": "Device ID",
      "value": "",
      "placeholder": "e.g 223344556",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "text",
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Device ID is required."
        }
      ]
    },
    {
      "name": "phoneNumber",
      "label": "Phone Number",
      "value": "",
      "placeholder": "e.g. +254712345678",
      "class": "col-md-6",
      "type": "text",
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "^(\\+254|0)[6-9][0-9]{8}$",
          "message": "Phone number must start with 0 or +254 and be 10 digits long."
        },
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Phone number is required."
        }
      ]
    },
    {
      "name": "status",
      "label": "Status",
      "value": "",
      "placeholder": "Select Status",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "options": [
        {"label": "Online", "value": "ONLINE"},
        {"label": "Offline", "value": "OFFLINE"}
      ],
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Status is Required"
        }
      ]
    }
  ]
}
