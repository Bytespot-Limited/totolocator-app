import {IForm} from "./interfaces/IForm";

export const driverForm: IForm = {
  formTitle: 'Driver',
  saveBtnTitle: 'Save Driver',
  resetBtnTitle: 'Cancel',
  displayColumns: [
    'id',
    'name',
    //'logoImageUrl',
    'phoneNumber',
    'entityStatus',
    'action',
  ],
  formControls: [
    {
      "name": "name",
      "label": "Driver Name",
      "value": "",
      "placeholder": "e.g John Doe",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "text",
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
      "name": "nationalId",
      "label": "National Id",
      "value": "",
      "placeholder": "e.g. 12345678",
      "class": "col-md-6",
      "type": "text",
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "^[0-9]{8}$",  // Adjust according to the ID format
          "message": "National ID number must be 8 digits long."
        },
        {
          "validatorName": "required",
          "pattern": "",
          "message": "National ID number is required."
        }
      ]
    },
    {
      "name": "profileImageUrl",
      "label": "Upload Image",
      "value": "",
      "placeholder": "Choose an image...",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "file",
      "validators": [
        // {
        //   "validatorName": "required",
        //   "pattern": "",
        //   "message": "Image file is required"
        // }
      ]
    },
    {
      "name": "emailAddress",
      "label": "Email",
      "value": "",
      "placeholder": "e.g admin@makinischools.com",
      "class": "col-md-6",
      "type": "text",
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "",
          "message": "Email address should be 8-15 characters in uppercase"
        },
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Email address is Required"
        }
      ]
    },
    {
      "name": "phoneNumber",
      "label": "Phone Number",
      "value": "",
      "placeholder": "e.g. 0712345678",
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
      "name": "assignmentStatus",
      "label": "Assignment Status",
      "value": "",
      "placeholder": "Assignment Status",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "options": [
        {"label": "Assigned", "value": "ASSIGNED"},
        {"label": "Unassigned", "value": "UNASSIGNED"}
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
