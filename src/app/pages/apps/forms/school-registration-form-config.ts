import {IForm} from "./interfaces/IForm";

export const schoolForm: IForm = {
  formTitle: 'School',
  saveBtnTitle: 'Save School',
  resetBtnTitle: 'Reset',
  formControls: [
    {
      "name": "name",
      "label": "Name",
      "value": "",
      "placeholder": "e.g Makini Schools",
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
          "message": "School name is Required"
        }
      ]
    },
    {
      "name": "location",
      "label": "Location",
      "value": "",
      "placeholder": "e.g Lavington, Nairobi",
      "class": "col-md-6",
      "type": "text",
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "^[a-zA-Z\\s]+$",
          "message": "Location should have only alphabet characters"
        },
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Location is Required"
        }
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
      "name": "logoImageUrl",
      "label": "Logo Image URL",
      "value": "",
      "placeholder": "Choose an image...",
      "class": "col-md-6",
      "type": "file",
      "validators": [
        // {
        //   "validatorName": "required",
        //   "pattern": "",
        //   "message": "Image file is required"
        // }
      ]
    }
    /*
    {
      "name": "entityStatus",
      "label": "Entity Status",
      "placeholder": "e.g active",
      "value": "",
      "class": "col-md-6",
      "type": "select",
      "options": [
        { "value": "ACTIVE", "label": "Active" },
        { "value": "INACTIVE", "label": "Inactive" }
      ],
      "validators": [
        {
          "validatorName": "",
          "pattern": "",
          "message": "Entity status is Required"
        }
      ]
    },
    {
      "name": "creationDate",
      "label": "Creation Date",
      "value": "",
      "placeholder": "e.g 12/03/2024",
      "class": "col-md-6",
      "type": "date",
      "validators": [
        {
          "validatorName": "",
          "pattern": "",
          "message": "Creation date is Required"
        }
      ]
    },
    {
      "name": "modifiedDate",
      "label": "Modified Date",
      "placeholder": "e.g 12/03/2024",
      "value": "",
      "class": "col-md-6",
      "type": "date",
      "validators": [
        {
          "validatorName": "",
          "pattern": "",
          "message": "Creation date is Required"
        }
      ]
    }
      */
  ]

}
