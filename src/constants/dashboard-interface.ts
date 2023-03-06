export interface IDashboardData {
  accumulatedValue: number;
  dates: string[];
  dayWiseData: { [key: string]: number };
  monthWiseData: { [key: string]: number };
  statisticalType: string;
}
