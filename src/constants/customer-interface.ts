export interface ICustomer {
  first_name: string;
  last_name: string;
  email_id: string;
  mobile_number: string;
  customer_id: string;
  bookingDetails: ICustomerBooking[];
}

export interface ICustomerBooking {
  bookingId: string;
  bookingStatus: string;
  customerAddress: {
    address_id: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    state: string;
    zip_code: string;
  };
  packageId: string;
  packageName: string;
  serviceProviderEmail: string;
  serviceProviderId: string;
  serviceProviderName: string;
  serviceType: string;
  slotDate: string;
  slotTime: string;
  totalPayable: number;
}
