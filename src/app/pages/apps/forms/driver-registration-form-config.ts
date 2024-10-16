import { IForm } from "./interfaces/IForm";

export const driverForm: IForm = {
  formTitle: 'Driver Form',
  saveBtnTitle: 'Add Driver',
  resetBtnTitle: 'Cancel',
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
    // {
    //   "name": "phoneNumber",
    //   "label": "Phone Number",
    //   "value": "",
    //   "placeholder": "+25470011233",
    //   "class": "col-md-6",
    //   "type": "text",
    //   "validators": [
    //     {
    //       "validatorName": "pattern",
    //       "pattern": "",
    //       "message": "Phone number should be 8-15 characters in uppercase"
    //     },
    //     {
    //       "validatorName": "required",
    //       "pattern": "",
    //       "message": "Phone number is Required"
    //     }
    //   ]
    // },
    {
      "name": "fileUpload",
      "label": "Upload Image",
      "value": "",
      "placeholder": "Choose an image...",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "file",
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Image file is required"
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
        { "label": "Assigned", "value": "ASSIGNED" },
        { "label": "Unassigned", "value": "UNASSIGNED" }
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
        { "label": "Inactive", "value": "INACTIVE " }
      ],
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Entity status is Required"
        }
      ]
    },

  ]
}
