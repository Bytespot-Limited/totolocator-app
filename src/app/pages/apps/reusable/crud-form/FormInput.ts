export class FormInput {
  type: string
  required: boolean
  id: string
  name: string
  title: string
  value: any
  placeholder: string
  dropdownOptions: [Dropdown]
}

export class Dropdown {
  key: string
  value: any
}
