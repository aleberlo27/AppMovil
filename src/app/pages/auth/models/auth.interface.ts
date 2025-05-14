export interface WorkerResponse {
  _id:         string;
  firstName:   string;
  lastName:    string;
  email:       string;
  companyCode: string;
  role:        number;
  schedules:   any[];
}
