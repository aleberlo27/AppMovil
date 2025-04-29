export interface Worker {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyCode: string;
  role: number;
  schedules: string[];
}

export interface Company {
  id: string;
  companyCode: string;
  name: string;
  email: string;
  password: string;
  role: number;
}
