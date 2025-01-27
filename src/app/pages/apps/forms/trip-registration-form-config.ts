import {IForm} from "./interfaces/IForm";

export const tripForm: IForm = {
  formTitle: 'Trip',
  saveBtnTitle: 'Save Trip',
  resetBtnTitle: 'Cancel',
  displayColumns: [
    'id',
    'tripType',
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
      "options": [
        {"label": "Dropoff", "value": "DROPOFF"},
        {"label": "Field Trip", "value": "FIELDTRIP"},
        {"label": "Pickup", "value": "PICKUP"}
      ],
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Trip type is Required"
        }
      ]
    }
    // {
    //   "name": "tripStatus",
    //   "label": "Trip Status",
    //   "value": "",
    //   "placeholder": "Select Trip Status",
    //   "class": "col-sm-12 d-flex align-items-center",
    //   "type": "select",
    //   "options": [
    //     { "label": "Completed", "value": "COMPLETED" },
    //     { "label": "Ongoing", "value": "ONGOING" },
    //     { "label": "Started", "value": "STARTED" }
    //   ],
    //   "validators": [
    //     {
    //       "validatorName": "required",
    //       "pattern": "",
    //       "message": "Trip status is Required"
    //     }
    //   ]
    // },
    // {
    //   "name": "entityStatus",
    //   "label": "Entity Status",
    //   "value": "",
    //   "placeholder": "Select Entity Status",
    //   "class": "col-sm-12 d-flex align-items-center",
    //   "type": "select",
    //   "options": [
    //     { "label": "Active", "value": "ACTIVE" },
    //     { "label": "Inactive", "value": "INACTIVE" }
    //   ],
    //   "validators": [
    //     {
    //       "validatorName": "required",
    //       "pattern": "",
    //       "message": "Entity status is Required"
    //     }
    //   ]
    // },
    // {
    //   "name": "startTime",
    //   "label": "Start Time",
    //   "value": "",
    //   "placeholder": "HH:MM",
    //   "class": "col-sm-12 d-flex align-items-center",
    //   "type": "time",
    //   "validators": [
    //     {
    //       "validatorName": "required",
    //       "pattern": "",
    //       "message": "Start time is Required"
    //     }
    //   ]
    // }
  ]
}
