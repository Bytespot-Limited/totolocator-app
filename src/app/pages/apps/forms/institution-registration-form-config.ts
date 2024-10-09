import {IForm} from "./interfaces/IForm";

export const organizationForm: IForm = {
  formTitle: 'Institution Form',
  saveBtnTitle: 'Create Organization',
  resetBtnTitle: 'Cancel',
  formControls: [
    {
      "name": "name",
      "label": "Organization Name",
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
          "message": "Organization name is Required"
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
      "name": "logoImageUrl",
      "label": "Logo Image",
      "value": "",
      "placeholder": "Upload your logo image",
      "class": "col-md-6",
      "type": "file",
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Logo image is required"
        },
        {
          "validatorName": "fileType",
          "pattern": "image/jpeg,image/png",
          "message": "Only JPEG and PNG images are allowed"
        },
        {
          "validatorName": "fileSize",
          "pattern": "1048576",
          "message": "Image size should not exceed 1MB"
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
    }


  ]
}
