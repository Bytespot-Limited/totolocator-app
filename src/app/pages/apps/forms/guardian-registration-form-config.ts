import { IForm } from "./interfaces/IForm";

export const guardianForm: IForm = {
  formTitle: 'Guardian Form',
  saveBtnTitle: 'Add Guardian',
  resetBtnTitle: 'Cancel',
  formControls: [
    {
      "name": "name",
      "label": "Name",
      "value": "",
      "placeholder": "e.g. John Doe",
      "class": "col-md-6",
      "type": "text",
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Name is required."
        },
        {
          "validatorName": "pattern",
          "pattern": "^[a-zA-Z\\s]+$",
          "message": "Name must contain only letters."
        }
      ]
    },
    {
      "name": "dob",
      "label": "Date of Birth",
      "value": "",
      "placeholder": "YYYY-MM-DD",
      "class": "col-md-6",
      "type": "date",
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Date of birth is required."
        }
      ]
    },
    {
      "name": "nationalId",
      "label": "National ID Number",
      "value": "",
      "placeholder": "e.g. 12345678",
      "class": "col-md-6",
      "type": "text",
      "validators": [
        {
          "validatorName": "pattern",
          "pattern": "^[0-9]{8}$",
          "message": "National ID must be 8 digits long."
        },
        {
          "validatorName": "required",
          "pattern": "",
          "message": "National ID is required."
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
      "name": "guardianType",
      "label": "Guardian Type",
      "value": "",
      "placeholder": "Select guardian type",
      "class": "col-md-6",
      "type": "select",
      "options": [
        { "value": "FATHER", "label": "Father" },
        { "value": "MOTHER", "label": "Mother" },
        { "value": "BROTHER", "label": "Brother" },
        { "value": "SISTER", "label": "Sister" },
        { "value": "GUARDIAN", "label": "Guardian" }
      ],
      "validators": [
        // {
        //   "validatorName": "required",
        //   "pattern": "",
        //   "message": "Guardian type is required."
        // }
      ]
    },
    {
      "name": "emailAddress",
      "label": "Email Address",
      "value": "",
      "placeholder": "e.g. example@example.com",
      "class": "col-md-6",
      "type": "email",
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Email address is required."
        },
        {
          "validatorName": "email",
          "pattern": "",
          "message": "Email address must be valid."
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
      "name": "entityStatus",
      "label": "Entity Status",
      "value": "",
      "placeholder": "Select status",
      "class": "col-md-6",
      "type": "select",
      "options": [
        { "value": "ACTIVE", "label": "Active" },
        { "value": "INACTIVE", "label": "Inactive" }
      ],
      "validators": [
        // {
        //   "validatorName": "required",
        //   "pattern": "",
        //   "message": "Entity status is required."
        // }
      ]
    },
    {
      "name": "creationDate",
      "label": "Creation Date",
      "value": "",
      "placeholder": "YYYY-MM-DDTHH:MM",
      "class": "col-md-6",
      "type": "datetime-local",
      "validators": [
        // {
        //   "validatorName": "required",
        //   "pattern": "",
        //   "message": "Creation date is required."
        // }
      ]
    },
    {
      "name": "modifiedDate",
      "label": "Modified Date",
      "value": "",
      "placeholder": "YYYY-MM-DDTHH:MM",
      "class": "col-md-6",
      "type": "datetime-local",
      "validators": [
        // {
        //   "validatorName": "required",
        //   "pattern": "",
        //   "message": "Modified date is required."
        // }
      ]
    }


  ]
}
