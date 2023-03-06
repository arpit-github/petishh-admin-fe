import DashboardImage from "public/dashboard.png";
import CustomerImage from "public/customer.png";
import ServiceProviderImage from "public/service-provider.png";
import BookingImage from "public/booking.png";

export const menus = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: DashboardImage,
  },
  {
    title: "Customers",
    route: "/customers",
    icon: CustomerImage,
  },
  {
    title: "Service Providers",
    route: "/service-providers",
    icon: ServiceProviderImage,
  },
  // {
  //   title: "Bookings",
  //   route: "/bookings",
  //   icon: BookingImage,
  // },
];
