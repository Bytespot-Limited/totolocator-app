
export interface EntityAction {
  // name of the record to be actioned e.g organizations
  name: string;
  // payload data to be passed to the API
  data: any;
  // id of the record
  id: string;
}
