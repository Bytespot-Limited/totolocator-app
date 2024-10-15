import {IForm} from "./interfaces/IForm";

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
          "message": "Location should be 8-15 characters in uppercase"
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
          "pattern": "",
          "message": "Phone number should be 8-15 characters in uppercase"
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
  //   {
  //     "name": "fileUpload",
  //     "label": "Upload Image",
  //     "value": "",
  //     "placeholder": "Choose an image...",
  //     "class": "col-sm-12 d-flex align-items-center",
  //     "type": "file",
  //     "validators": [
  //         {
  //             "validatorName": "required",
  //             "pattern": "",
  //             "message": "Image file is required"
  //         }
  //     ]
  // }
  
  ]
}
