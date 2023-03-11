export interface IDashboardData {
  accumulatedValue: number;
  dates: string[];
  dayWiseData: { [key: string]: number };
  monthWiseData: { [key: string]: number };
  statisticalType: string;
}

export interface IAmountPayableResp {
  serviceProviderEmail: string;
  serviceProviderId: string;
  serviceProviderMobile: string;
  serviceProviderName: string;
  totalAmountPayable: number;
  amountBreakup: IAmountBreakup[];
}

interface IAmountBreakup {
  bookingId: string;
  bookingName: string;
  payableToServiceProvider: number;
}
