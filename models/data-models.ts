export interface iUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  city: any;
  phone: any;
  profile_id: number;
  balance: string;
  loan_balance: any;
  expiration: string;
  last_online: any;
  parent_id: number;
  email: any;
  static_ip: any;
  enabled: number;
  company: any;
  notes: any;
  simultaneous_sessions: number;
  address: any;
  contract_id: any;
  created_at: string;
  national_id: any;
  mikrotik_ipv6_prefix: any;
  group_id: any;
  gps_lat: any;
  gps_lng: any;
  street: any;
  n_row: number;
  remaining_days: number;
  status: Status;
  online_status: number;
  parent_username: string;
  profile_details: ProfileDetails;
  daily_traffic_details: any;
  group_details: any;
}

export interface Tickets {
  id: number;
  ID: string,
  Date: string;
  username: string;
  firstname: string;
  lastname: string;
  status: string;
}

export interface Groups {
  id: number;
  Name: string;
  Description: string;
  Users: string;
  Managers: string;
  status: Status;
}

export interface Managers {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  Balance: string;
  Debts: string;
  Permissions: string;
  Parent: string;
  Users: string;
  status: Status;
}

export interface Status {
  status: boolean;
  traffic: boolean;
  expiration: boolean;
  uptime: boolean;
}

export interface ProfileDetails {
  id: number;
  name: string;
  type: number;
}
