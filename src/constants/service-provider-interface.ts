export interface IServiceProvider {
  service_provider_id: string;
  first_name: string;
  last_name: string;
  email_id: string;
  mobile_number: number;
  gender: string;
  avgRating: number;
  totalRatings: number;
  outwardPayments: IOutwardPayment[];
  service_types: string[];
  serviceable_zip_codes: string[];
}

export interface IOutwardPayment {
  amount: number;
  created_at: number;
  created_at_str: string;
}
