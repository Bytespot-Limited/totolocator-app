import {IForm} from "./interfaces/IForm";

export const schoolStuffForm: IForm = {
  formTitle: 'School Stuff',
  saveBtnTitle: 'Save Staff',
  resetBtnTitle: 'Cancel',
  displayColumns: [
    'id',
    'name',
    //'logoImageUrl',
    'roleDescription',
    'entityStatus',
    'action',
  ],
  formControls: [
    {
      "name": "name",
      "label": "Name",
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
      "label": "National ID",
      "value": "",
      "placeholder": "e.g 32323232",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "text",
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Student name is Required"
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
      "validators": [
        // {
        //   "validatorName": "required",
        //   "pattern": "",
        //   "message": "Image file is required"
        // }
      ]
    },
    {
      "name": "phoneNumber",
      "label": "Phone Number",
      "value": "",
      "placeholder": "+25470011233",
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
          "message": "Phone number is Required"
        }
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
          "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          "message": "Please enter a valid email address"
        },
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Email address is Required"
        }
      ]
    },
    {
      "name": "roleDescription",
      "label": "Role Description",
      "value": "",
      "placeholder": "e.g Bursar",
      "class": "col-md-6",
      "type": "select",
      "options": [
        {"label": "Bursar", "value": "BURSAR"},
        {"label": "Transport Manager", "value": "TRANSPORT_MANAGER"},
        {"label": "Secretary", "value": "SECRETARY"}

      ],
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Email address is Required"
        }
      ]
    },

  ]
}
