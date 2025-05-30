import {IForm} from "./interfaces/IForm";

// @ts-ignore
// @ts-ignore
export const studentForm: IForm = {
  formTitle: 'Student Form',
  saveBtnTitle: 'Add Student',
  resetBtnTitle: 'Cancel',
  displayColumns: [
    'id',
    'name',
    //'logoImageUrl',
    'classLevel',
    'billingStatus',
    'entityStatus',
    'action',
  ],
  formControls: [
    {
      "name": "name",
      "label": "Student Name",
      "value": "",
      "placeholder": "e.g John Doe",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "text",
      "displayInput": true,
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "^[a-zA-Z\\s]+$",
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
      "name": "dob",
      "label": "Date of Birth",
      "value": "",
      "placeholder": "YYYY-MM-DD",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "date",
      "displayInput": true,
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Date of Birth is required."
        },
        // {
        //   "validatorName": "minAge",
        //   "minAge": 18,
        //   "message": "You must be at least 18 years old."
        // }
      ]
    },
    {
      "name": "classLevel",
      "label": "Class Level",
      "value": "",
      "placeholder": "Class Level",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "displayInput": true,
      "options": [
        {"label": "Grade 1", "value": "GRADE_1"},
        {"label": "Grade 2", "value": "GRADE_2"},
        {"label": "Grade 3", "value": "GRADE_3"},
        {"label": "Grade 4", "value": "GRADE_4"},
        {"label": "Grade 5", "value": "GRADE_5"}
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
      "name": "profileImageUrl",
      "label": "Profile Image",
      "value": "",
      "placeholder": "Choose an image...",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "file",
      "displayInput": true,
      "validators": [
        // {
        //   "validatorName": "required",
        //   "pattern": "",
        //   "message": "Image file is required"
        // }
      ]
    },
    {
      "name": "billingStatus",
      "label": "Billing Status",
      "value": "",
      "placeholder": "e.g. ACTIVE",
      "class": "col-md-6",
      "type": "select",
      "displayInput": true,
      "options": [
        {"value": "ACTIVE", "label": "ACTIVE"},
        {"value": "OVERDUE", "label": "OVERDUE"}
      ],
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Billing status is required."
        }
      ]
    },
    {
      "name": "nextBillingCycle",
      "label": "Next Billing Cycle",
      "value": "",
      "placeholder": "YYYY-MM-DD",
      "class": "col-md-6",
      "type": "date",
      "displayInput": true,
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Next billing cycle is required."
        }
      ]
    },
    {
      "name": "homeAddress",
      "label": "Home Address",
      "value": "",
      "placeholder": "e.g Lavington, Nairobi",
      "class": "col-md-6",
      "type": "map",
      "displayInput": true,
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "^[a-zA-Z\\s]+$",
          "message": "Home Address should be 8-15 characters in uppercase"
        },
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Home Address is Required"
        }
      ]
    },
    {
      "name": "longitude",
      "label": "Longitude",
      "value": "",
      "placeholder": "e.g. -122.4194",
      "class": "col-md-6",
      "type": "text",
      "displayInput": false,
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "^-?\\d{1,3}(\\.\\d+)?$",
          "message": "Longitude must be a valid number between -180 and 180."
        },
        // {
        //   "validatorName": "required",
        //   "pattern": "",
        //   "message": "Longitude is required."
        // }
      ]
    },
    {
      "name": "latitude",
      "label": "Latitude",
      "value": "",
      "placeholder": "e.g. 37.7749",
      "class": "col-md-6",
      "type": "text",
      "displayInput": false,
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "^-?\\d{1,2}(\\.\\d+)?$",
          "message": "Latitude must be a valid number between -90 and 90."
        },
        // {
        //   "validatorName": "required",
        //   "pattern": "",
        //   "message": "Latitude is required."
        // }
      ]
    }
    // {
    //   "name": "entityStatus",
    //   "label": "Entity Status",
    //   "value": "",
    //   "placeholder": "e.g. ACTIVE",
    //   "class": "col-md-6",
    //   "type": "select",  // Assuming a dropdown for enum values
    //   "options": [
    //     { "value": "ACTIVE", "label": "Active" },
    //     { "value": "INACTIVE", "label": "Inactive" }
    //   ],
    //   "validators": [
    //     // {
    //     //   "validatorName": "required",
    //     //   "pattern": "",
    //     //   "message": "Entity status is required."
    //     // }
    //   ]
    // },
    //
    // {
    //   "name": "creationDate",
    //   "label": "Creation Date",
    //   "value": "",
    //   "placeholder": "YYYY-MM-DDTHH:MM",
    //   "class": "col-md-6",
    //   "type": "datetime-local",
    //   "validators": [
    //     // {
    //     //   "validatorName": "required",
    //     //   "pattern": "",
    //     //   "message": "Creation date is required."
    //     // }
    //   ]
    // },
    // {
    //   "name": "modifiedDate",
    //   "label": "Modified Date",
    //   "value": "",
    //   "placeholder": "YYYY-MM-DDTHH:MM",
    //   "class": "col-md-6",
    //   "type": "datetime-local",
    //   "validators": [
    //     // {
    //     //   "validatorName": "required",
    //     //   "pattern": "",
    //     //   "message": "Modified date is required."
    //     // }
    //   ]
    // }

  ]
}
