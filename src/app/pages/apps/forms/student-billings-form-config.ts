import {IForm} from "./interfaces/IForm";

export const studentBillingsForm: IForm = {
  formTitle: 'Invoice',
  saveBtnTitle: 'Save Invoice',
  resetBtnTitle: 'Cancel',
  displayColumns: [
    'id',
    'paymentChannel',
    'paymentReference',
    'subscriptionStart',
    'subscriptionEnd',
    'action',
  ],
  formControls: [
    {
      "name": "paymentChannel",
      "label": "Payment Channel",
      "value": "",
      "placeholder": "e.g. MPESA",
      "class": "col-md-6",
      "type": "text",
      "displayInput": true,
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Payment channel is required."
        }
      ]
    },
    {
      "name": "paymentReference",
      "label": "Payment Reference",
      "value": "",
      "placeholder": "e.g. QK7E2X1P",
      "class": "col-md-6",
      "type": "text",
      "displayInput": true,
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Payment reference is required."
        }
      ]
    },
    {
      "name": "subscriptionStart",
      "label": "Subscription Start",
      "value": "",
      "placeholder": "YYYY-MM-DDTHH:MM",
      "class": "col-md-6",
      "type": "datetime-local",
      "displayInput": true,
      "validators": []
    },
    {
      "name": "subscriptionEnd",
      "label": "Subscription End",
      "value": "",
      "placeholder": "YYYY-MM-DDTHH:MM",
      "class": "col-md-6",
      "type": "datetime-local",
      "displayInput": true,
      "validators": []
    },
    {
      "name": "student",
      "label": "Student",
      "value": "",
      "placeholder": "Select Student",
      "class": "col-sm-12 d-flex align-items-center",
      "type": "select",
      "displayInput": true,
      "options": [],
      "apiEndpoint": "students",
      "optionLabel": "name",
      "optionValue": "id",
      "isRelation": true,
      "validators": [
        {
          "validatorName": "required",
          "pattern": "",
          "message": "Student is required."
        }
      ]
    }
  ]
}
